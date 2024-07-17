import React from 'react';
import { Observable } from 'rxjs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/stockStore';
import { updateStock } from './stockSlice';
import './stock.css'


const Stock: React.FC = () => {
    const stocks = useSelector((state: RootState) => state.stock.value);
    const dispatch: AppDispatch = useDispatch();


    // const formatCash = Intl.NumberFormat('en-US', {
    //     notation: "compact",
    //     maximumFractionDigits: 1
    // }).format(25000000);

    // console.log(formatCash);


    // Create an Observable from EventSource
    const createEventSourceObservable = (url: string) => {
        return new Observable(subscriber => {
            const eventSource = new EventSource(url);

            eventSource.onmessage = (event) => {
                subscriber.next(event.data);
            };

            eventSource.onerror = (error) => {
                subscriber.error(error);
            };

            // Cleanup function
            return () => {
                eventSource.close();
            };
        });
    };

    // Usage
    const sseObservable = createEventSourceObservable('http://localhost:3002/events');

    const subscription = sseObservable.subscribe({
        next(data: any) {
            const parsedData = JSON.parse(data);
            dispatch(updateStock(parsedData));
            // setFacts((facts) => facts.concat(parsedData));
        },
        error(err) {
            console.error('Error:', err);
        },
        complete() {
            console.log('Stream complete');
        }
    });



    return (
        <table className="stats-table">
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Liquidity ±2%</th>
                    <th>All Time High</th>
                    <th>1H</th>
                    <th>24H</th>
                </tr>
            </thead>
            <tbody>
                {
                    stocks.map((stock: any, i: number) =>
                        <tr key={i}>
                            <td>{stock?.name}</td>
                            <td>${stock?.rate?.toFixed(2)}</td>
                            <td>${Intl.NumberFormat('en-US', {
                                notation: "compact",
                                maximumFractionDigits: 1
                            }).format(stock?.cap)}</td>
                            <td>${Intl.NumberFormat('en-US', {
                                notation: "compact",
                                maximumFractionDigits: 1
                            }).format(stock?.liquidity)}</td>
                            <td>${stock?.allTimeHighUSD?.toFixed(2)}</td>
                            <td>{stock?.delta?.hour}</td>
                            <td>{stock?.delta?.day}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default Stock;

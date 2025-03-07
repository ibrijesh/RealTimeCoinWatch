import Crypto from "../models/cryptoModel";

export let clients: any = [];

export default async function eventsHandler(request: any, response: any, next: any) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const allCryptos = await Crypto.find({}, { _id: 0 });

  response.write(`data: ${JSON.stringify(allCryptos)}\n\n`);

  const clientId = Date.now();

  console.log(clientId);


  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client: any) => client.id !== clientId);
  });
}
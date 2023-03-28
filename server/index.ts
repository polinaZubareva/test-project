import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import service from './src/service';
import { TCompany } from './src/company.type';

config();
const PORT: number = Number(process.env.PORT) || 5000;

let app = express();

app.use(express.json());
app.use(cors());

app.use('/', async (req: Request, res: Response) => {
  const inn = req.body!.inn;

  let data = JSON.stringify({
    query: inn,
  });

  let token = process.env.API_KEY;

  let options = {
    host: 'suggestions.dadata.ru',
    port: 80,
    mode: 'cors' as RequestMode,
    path: '/suggestions/api/4_1/rs/findById/party',
    method: String(req.method),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Content-Length': Buffer.byteLength(data),
      Authorization: 'Token ' + token,
    },
    body: data,
  };

  let resultAll: string = '';

  let companyInBase,
    companyFromWeb: TCompany = { name: [] };

  companyInBase = await service.getInBase(inn);
  if (companyInBase !== undefined) res.send(companyInBase.name);
  else {
    let httpReq = http
      .request(options, (response) => {
        response.setEncoding('utf8');

        response.on('data', (chunk: string) => {
          resultAll += chunk;
        });
        response.on('end', async () => {
          const { suggestions } = JSON.parse(resultAll);

          companyFromWeb.name = suggestions.map(
            (item: { value: string }) => item.value
          );

          await service.addCompany(inn, companyFromWeb.name);
          res.send(companyFromWeb.name);
        });
      })
      .on('error', (err) => {
        console.error(`problem with request: ${err.message}`);
      });

    httpReq.write(data);
    httpReq.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

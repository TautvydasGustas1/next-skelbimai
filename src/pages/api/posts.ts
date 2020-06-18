// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export interface Posts {
    name: string;
    price: Number;
    description: string;
    date_added: Date;
    picture: string;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    res.json([
        { name: 'Telefonas' },
        { price: 100 },
        { description: 'Labai geras telefonas' },
        { date_added: '2010-10-10' },
        { picture: 'phone' },
    ]);
};

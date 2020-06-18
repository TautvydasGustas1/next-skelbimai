import { NextApiRequest, NextApiResponse } from 'next';

export interface Post {
    name: string;
    price: Number;
    description: string;
    date_added: Date;
    picture: string;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    res.json({
        id: '123',
        name: 'Telefonas',
        price: 100,
        description: 'Labai geras telefonas',
        date_added: '2010-10-10',
        picture: 'phone1.jpg',
    });
};

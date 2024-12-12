import express, {Request, Response} from 'express'
import cors from 'cors'
import {HTTP_STATUSES, SETTINGS} from './settings';
import {videoRouter} from './videos/videoRouter';

export const app = express()
app.use(express.json())
app.use(cors())
app.use(SETTINGS.PATH.VIDEOS, videoRouter)

app.get('/', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).json({version: '2.0'})
})

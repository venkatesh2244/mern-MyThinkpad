
import { Redis } from '@upstash/redis'
import {Ratelimit} from "@upstash/ratelimit"
import dotenv from "dotenv"
dotenv.config()

const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100,"60 s") //allowing 10 requests per 60 seconds

})

export default ratelimit;
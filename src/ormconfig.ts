import { ConnectionOptions } from 'typeorm';
import {Location} from './location/location.entity'
import { Activity } from './activity/activity.entity';
import {Account} from "./users/users.entity";

const config: ConnectionOptions={
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username:'blocknote',
  password: 'blocknote',
  database: 'blocknote',
  entities:[Account,Location,Activity],
  synchronize: true,

}
export default config
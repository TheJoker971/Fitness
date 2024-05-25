import {config} from 'dotenv';
import {AppUtils} from "./utils/app.utils";
config();



AppUtils.launchAPI().catch(console.error);


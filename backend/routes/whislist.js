const  { addWhislist, getwhishItems, removeWishlistItem } = require('../controller/whislistlogic');


const app = express();
const router = express.Router();


     router.get('/:userId' , getwhishItems)
     router.post('/post', addWhislist)
     router.delete('/:userId/:productId', removeWishlistItem)

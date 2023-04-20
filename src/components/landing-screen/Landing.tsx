import { Link } from "react-router-dom";
import './Landing.css';
 import Logo from '../../assets/quicksilver-logo.png';
 import Docs from '../../assets/icons/docs.svg';
 import YT from '../../assets/icons/youtube.svg';
 import Moment from 'moment';
 

export default function Landing() {
    return    (
        <div className="landing-page">
            <div className="w-80 d-flex align-items-center justify-content-center flex-column">
                <div className="landing-page-content text-center">
             <img alt="Quicksilver Logo" className="logo" src={Logo}/>
             
             <h2 className="my-3"> QUICKSILVER</h2>
             <p className="mb-5">THE COSMOS LIQUID STAKING ZONE</p> 
        <Link className="px-5 py-3  mt-5" to="/stake/delegate">Get Started</Link> 
   
        </div>
     
        <div className="social-media-icons mt-5">
        <a href="https://t.me/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Telegram">
									<span className="icon-telegram mx-2"></span>
								</a>
								<a href="https://twitter.com/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Twitter">
									<span className="icon-twitter mx-2"></span>
								</a>
								<a href="https://discord.com/invite/xrSmYMDVrQ" target="_blank" rel="nofollow noreferrer" title="Discord">
									<span className="icon-discord mx-2"></span>
								</a>
								<a href="https://medium.com/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Medium">
									<span className="icon-medium mx-2"></span>
								</a>
                                <a href="https://www.youtube.com/channel/UCFHGQ7SAtIyAlNHewNNVU1A " target="_blank" rel="nofollow noopener" title="Medium">
											<img className="icon-yt" src={YT}/>
								</a>
								<a href="https://docs.quicksilver.zone/ " target="_blank" rel="nofollow noopener" title="Medium">
									<img className="icon-docs"	 src={Docs}/>
						</a>
        </div>
        </div>
  
        </div>
    
    )
}
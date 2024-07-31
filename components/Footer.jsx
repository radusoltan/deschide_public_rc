import Image from "next/image";
import logo from "@/public/deschide_logo.svg";
import {faTelegram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import lu from "@/public/img/footer/lu.png"
import tr from "@/public/img/footer/tr.png"
import ccpe from "@/public/img/footer/ccpe.png"
import ce from "@/public/img/footer/ce.png"
import cl from "@/public/img/footer/cl.png"
import rnews from "@/public/img/footer/rnews.png"
import unirea from "@/public/img/footer/unirea.png"
export const Footer = ()=>{
  return <footer className="bg-gray-300 text-gray-600">
    <div id="footer-content" className="relative pt-8 xl:pt-16 pb-6 xl:pb-12">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2 overflow-hidden">
        <div className="flex flex-wrap flex-row lg:justify-between -mx-3">
          <div className="flex-shrink max-w-full w-full lg:w-2/5 px-3 lg:pr-16">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl leading-normal mb-2 font-bold text-gray-700 mt-3 font-title">DESCHIDE.MD</span>
              <Image src={logo} alt="LOGO" className="w-10"/>
            </div>
            <p className="font-text mb-6">Portal de stiri din Republica Moldova.</p>
            <p className="text-sm font-text">Str. Alexandr Pușkin 20, ap.5 <br/>
              Chisinau, MD-2012, Republica Moldova <br/>
              +373 60 103 111, <br/>contact[at]deschide.md</p>
            <ul className="space-x-3 mt-6 mb-6 Lg:mb-0">
              {/* facebook */}
              <li className="inline-block">
                <a target="_blank" className="hover:text-gray-100" rel="noopener noreferrer"
                   href="https://www.facebook.com/DeschideStirea/" title="Facebook">
                  {/* <i class="fab fa-facebook fa-2x"></i> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"></path>
                  </svg>
                </a>
              </li>
              {/* twitter */}
              <li className="inline-block">
                <a target="_blank" className="hover:text-gray-100" rel="noopener noreferrer"
                   href="https://twitter.com/DeschideMD" title="Twitter">
                  {/*<i class="fab fa-twitter fa-2x"></i>*/}
                  <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"></path>
                  </svg>
                </a>
              </li>
              {/*youtube*/}
              <li className="inline-block">
                <a target="_blank" className="hover:text-gray-100" rel="noopener noreferrer"
                   href="https://www.youtube.com/channel/UCA-r1a0N9nFTNw2XlCTdt4Q" title="Youtube">
                  {/* <i class="fab fa-youtube fa-2x"></i> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"></path>
                  </svg>
                </a>
              </li>
              {/*instagram*/}
              <li className="inline-block">
                <a target="_blank" className="hover:text-gray-100 text-4xl" rel="noopener noreferrer"
                   href="https://t.me/deschide_md" title="Instagram">
                  {/* <i class="fab fa-instagram fa-2x"></i> */}
                  <FontAwesomeIcon icon={faTelegram}/>
                </a>
              </li>
              {/* end instagram */}
            </ul>
          </div>
        </div>
        <div className="flex mx-auto items-center">
          <div className="mx-2">
            <Image src={lu} width={100} alt=""/>
            {/*<img src="/img/footer/lu.png" alt="lu"  width={100}/>*/}
          </div>
          <div className="mx-2">
            <Image src={ccpe} width={100} alt=""/>
            {/*<img src="/img/footer/ccpe.png"   width={100}/>*/}
          </div>
          <div className="mx-2">
            <Image src={ce} width={100} alt=""/>
            {/*<img src="/img/footer/ce.png"   width={100}/>*/}
          </div>
          <div className="mx-2">
            <Image src={cl} width={100} alt=""/>
            {/*<img src="/img/footer/cl.png"   width={100}/>*/}
          </div>
          <div className="mx-2">
            <Image src={rnews} alt="" width={100}/>
          </div>
          <div className="mx-2">
            <Image src={tr} alt="" width={100}/>
          </div>
          <div className="mx-2">
            <Image src={unirea} alt="" width={100}/>
          </div>
        </div>
      </div>
    </div>


    <div className="footer-dark">
      <div className="container py-4 border-t border-gray-200 border-opacity-10">
        <div className="row">
          <div className="mx-10">
            <p className="d-block my-3">Copyright © Deschide.MD | Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
}
import fbIcon from '@src/assets/icons/fb.png'
import ytIcon from '@src/assets/icons/youtube.png'
import instaIcon from '@src/assets/icons/instagram.png'
import tiktokIcon from '@src/assets/icons/tiktok.png'
import gmailIcon from '@src/assets/icons/gmail.png'
import phoneIcon from '@src/assets/icons/phone.png'
import locationIcon from '@src/assets/icons/locations.png'
import { FormattedMessage } from 'react-intl'
import { FooterColumn } from '@src/@types/types'


const footerSection:FooterColumn[] = [
    {
        title: <FormattedMessage id='follow.us'/>,
        links: [
          { text: "Facebook", url: "#", img: fbIcon},
          { text: "Youtube", url: "#", img: ytIcon},
          { text: "Instagram", url: "#", img: instaIcon},
          { text: "Tik Tok", url: "#", img: tiktokIcon},
        ],
      },
      {
        title: <FormattedMessage id='contact'/>,
        links: [
          { text: "info@zoomer.ge", url: "#", img: gmailIcon},
          { text: "+995 (32) 2 60 30 60 / *7007", url: "#", img: phoneIcon},
          { text: <FormattedMessage id='branches'/>, url: "#", img: locationIcon},
          { text: "Zoomer App", url: "#", },
        ],
      },
]

export default function FooterColumns() {
  return (
    <div className="custom-container grid justify-between grid-flow-col py-5" > {/* style={{gridTemplateColumns: 'auto auto'}}*/}
        {footerSection.map((section, index) => {
            return <div key={index} className="grid grid-cols-1 gap-5">
                    <div>
                        <p className="mb-[15px] firago-bold text-xs leading-5 text-black-08 dark:text-dark-black-8">{section.title}</p>
                        <hr className="mb-[5px] border border-solid border-orange-main"/>
                    </div>
                    {section.links.map((link, index) => {
                        return <a key={index} href={link.url} className="flex items-center text-black-main no-underline text-xs font-medium">
                            {link.img && <img src={link.img} alt='footer row icon' className='w-[20px] mr-[10px]'/>}
                            <span className='firago-medium text-xs leading-5 text-black-08 dark:text-dark-black-8'>{link.text}</span>
                            </a>
                    })}
            </div>
        })}
        </div>
  )
}

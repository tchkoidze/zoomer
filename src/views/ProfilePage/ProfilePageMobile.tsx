
import { FormattedMessage } from 'react-intl';
import { useAuthProvider } from '@src/providers/AuthProvider/useAuthProvider';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ProfileMenuEnum } from '@src/@types/types';
import React, { useEffect, useState } from 'react'
import lefrArrow from '@src/assets/icons/light/category-left-arr.png'
import leftArrowDark from '@src/assets/icons/dark/category-left-arr.png'
import EditProfile from './EditProfile/EditProfile';
import profileIcon from '@src/assets/icons/light/profile-icon.png'
import profileIconDark from '@src/assets/icons/dark/profile-icon.png'
import Wishlist from './Wishlist/Wishlist';
import PurchaseHistory from './PurchaseHistory/PurchaseHistory';
import { useGlobalProvider } from '@src/providers/GlobalProvider/useGlobalProvider';
import { useLocation } from 'react-router-dom';
import LogoutModal from '@src/components/LogoutModal/LogoutModal';

export default function ProfilePageMobile({selected, setSelected, updateLoading, setUpdateLoading} : {selected: ProfileMenuEnum, setSelected: React.Dispatch<React.SetStateAction<ProfileMenuEnum>>, updateLoading: boolean, setUpdateLoading: React.Dispatch<React.SetStateAction<boolean>>}) {

  const {userData} = useAuthProvider();
  const {lightMode} = useThemeProvider();
  const {route} = useGlobalProvider();
  const location = useLocation();
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);

  function showLogoutModal() {
    setIsLogoutModal(true);
  }
  function closeLogoutModal() {
    setIsLogoutModal(false);
  }

  function handleMenuSelect(selectOption: ProfileMenuEnum) {
    setSelected(selectOption)
    localStorage.setItem('selected', selectOption)
  }

  useEffect(()=> {
    if ((route.to !== route.from) && (location.pathname !== route.to)) {
      localStorage.setItem('selected', ProfileMenuEnum.ON_MENU);
      setSelected(ProfileMenuEnum.ON_MENU);
    }
  }, [])

  const [parent] = useAutoAnimate({duration: 300, easing: 'ease-in-out'})
  
  return (
    <div>
      <div ref={parent}>  {/*profile page header based on the selected menu item */}
        {selected === ProfileMenuEnum.ON_MENU && (
          <div className="flex items-center">
            <img src={lightMode ? profileIcon : profileIconDark} alt="profile icon" className="w-6 mr-3"/>
            <h1 className="firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main"> <FormattedMessage id="hello"/>, {userData?.first_name}</h1>
          </div>
        )}
        {selected === ProfileMenuEnum.ON_EDITING && (
          <div className='flex items-center cursor-pointer' onClick={() => handleMenuSelect(ProfileMenuEnum.ON_MENU)}>
            <img src={lightMode ? lefrArrow : leftArrowDark} className='h3 mr-3'/>
            <h1 className="firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main"> <FormattedMessage id="edit.profile"/></h1>
          </div>
        )}
        {selected === ProfileMenuEnum.ON_WISHLIST && (
          <div className='flex items-center cursor-pointer' onClick={() => handleMenuSelect(ProfileMenuEnum.ON_MENU)}>
            <img src={lightMode ? lefrArrow : leftArrowDark} className='h3 mr-3'/>
            <h1 className="firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main"> <FormattedMessage id="wishlist"/></h1>
          </div>
        )}
        {selected === ProfileMenuEnum.ON_PURCHASE_HISTORY && (
          <div className='flex items-center cursor-pointer' onClick={() => handleMenuSelect(ProfileMenuEnum.ON_MENU)}>
            <img src={lightMode ? lefrArrow : leftArrowDark} className='h3 mr-3'/>
            <h1 className="firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main"> <FormattedMessage id="purchase.history"/></h1>
          </div>
        )}
      </div>
      <hr className="mt-[20px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
      <div ref={parent}>
        {selected === ProfileMenuEnum.ON_MENU && (
          <div className='w-full'>
            <div className='flex justify-between cursor-pointer' onClick={()=>handleMenuSelect(ProfileMenuEnum.ON_EDITING)}>
              <h3 className='firago-normal text-sm leading-[17px] mb-[30px] text-black-main dark:text-dark-black-main'><FormattedMessage id='edit.profile'/></h3>
              <img src={lightMode ? lefrArrow : leftArrowDark} className='rotate-180 h-3'/>
            </div>
            <div className='flex justify-between cursor-pointer' onClick={()=>handleMenuSelect(ProfileMenuEnum.ON_WISHLIST)}>
              <h3 className='firago-normal text-sm leading-[17px] mb-[30px] text-black-main dark:text-dark-black-main'><FormattedMessage id='wishlist'/></h3>
              <img src={lightMode ? lefrArrow : leftArrowDark} className='rotate-180 h-3'/>
            </div>
            <div className='flex justify-between cursor-pointer' onClick={()=>handleMenuSelect(ProfileMenuEnum.ON_PURCHASE_HISTORY)}>
              <h3 className='firago-normal text-sm leading-[17px] cursor-pointer text-black-main dark:text-dark-black-main'><FormattedMessage id='purchase.history'/></h3>
              <img src={lightMode ? lefrArrow : leftArrowDark} className='rotate-180 h-3'/>
            </div>
            <div className='flex justify-between cursor-pointer'>
              <h4 className="text-orange-main cursor-pointer firago-normal leading-[17px] text-sm opacity-80 block mt-20" 
              onClick={showLogoutModal}><FormattedMessage id="logout"/></h4>
             </div>
          </div>
        )}
        {selected === ProfileMenuEnum.ON_EDITING && (
            <EditProfile updateLoading={updateLoading} setUpdateLoading={setUpdateLoading}/>
        )}
        {selected === ProfileMenuEnum.ON_WISHLIST && (
          <Wishlist/>
        )}
        {selected === ProfileMenuEnum.ON_PURCHASE_HISTORY && (
          <PurchaseHistory/>
        )}
      </div>
      {isLogoutModal && <LogoutModal modalOpen={isLogoutModal} closeModal={closeLogoutModal}/>}
    </div>
  )
}

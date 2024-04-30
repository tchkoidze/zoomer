import { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import NavButton from '@src/layouts/PublicLayout/Navigation/NavButton/NavButton'
import NavSearch from './NavSearch/NavSearch'
import CategoriesTabMobile from '@src/components/CategoriesTab/CategoriesTabMobile'
import headerLogo from '@src/assets/icons/main-logo.png'
import dotsIcon from '@src/assets/icons/dots.png'
import cartIcon from '@src/assets/icons/light/cart.png'
import cartIconDark from '@src/assets/icons/dark/cart.png'
import userIcon from '@src/assets/icons/light/user-icon.png'
import userIconDark from '@src/assets/icons/dark/user-icon.png'
import LogInModal from '@src/components/LogInModal/LogInModal'
import CartModal from '@src/components/CartModal/CartModal'
import searchIcon from '@src/assets/icons/light/search.png'
import searchIconDark from '@src/assets/icons/dark/search.png'
import burgerIcon from '@src/assets/icons/light/burger-icon.png'
import burgerIconDark from '@src/assets/icons/dark/burger-icon.png'
import burgerCloseIcon from '@src/assets/icons/light/close.png'
import burgerCloseIconDark from '@src/assets/icons/dark/close.png'
import { ButtonEnum } from '@src/@types/types'
import { useAuthProvider } from '@src/providers/AuthProvider/useAuthProvider'
import { AuthStageEnum } from '@src/providers/AuthProvider/AuthContext'
import { useGlobalProvider } from '@src/providers/GlobalProvider/useGlobalProvider'
import { useMediaQuery } from 'react-responsive'
import { useCartProvider } from '@src/providers/CartProvider/useCartProvider'
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider'

export default function Navigation() {

    const {loginModalOpen, setLoginModalOpen} = useGlobalProvider();
    const {cartItems} = useCartProvider();
    const {authStage} = useAuthProvider();
    const {setShowOverlay} = useGlobalProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const [cartModal, setCartModal] = useState<boolean>(false);
    const [categoriesTabModal, setCategoriesTabModal] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<boolean>(false);
    const {lightMode} = useThemeProvider();

    function showLoginModal() {
        setLoginModalOpen(true);
    };
    function closeLoginModal(){
        setLoginModalOpen(false);
    };
    function showCartModal() {
        setCartModal(true);
    }
    function closeCartModal() {
        setCartModal(false);
    }
    function showCategoriesTabModal() {
        setShowOverlay(true);
        setCategoriesTabModal(true);
        setSearchInput(false);
    }
    function closeCategoriesTabModal() {
        setShowOverlay(false);
        setCategoriesTabModal(false);
    }
    function showSearchInput() {
        setSearchInput(true);
        setCategoriesTabModal(false);
    }
    function closeSearchInput() {
        setSearchInput(false);
        setShowOverlay(false);
    }
    function handleCartClick() {
        if (authStage === AuthStageEnum.AUTHORIZED) {
            navigate("/cart");
        } else setLoginModalOpen(true);
    }

    /* if location changes, close seach result element and categories tab modal */
    useEffect(()=> {
        if (categoriesTabModal || searchInput) {
            closeCategoriesTabModal();
            closeSearchInput();
        }
    }, [location.pathname])

    /* if user changes from mobile to desktop, close them */
    useEffect(()=> {
        if (isDesktop) {
            closeSearchInput();
            closeCategoriesTabModal();
        }
    }, [isDesktop])

    /* close cart modal when user leaves on all directions except downwards */
    function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
        const { clientX, clientY } = event;
        const { left, top, width } = event.currentTarget.getBoundingClientRect();
    
        if (clientX < left) {
            closeCartModal();
        } else if (clientX > left + width) {
            closeCartModal();
        } else if (clientY < top) {
            closeCartModal();
        }
    }
    
    /* close cart modal when user leaves modal on all directions except upwards */
    function handleMouseLeaveModal(event: React.MouseEvent<HTMLElement>) {
        const { clientX, clientY } = event;
        const { left, top, width} = event.currentTarget.getBoundingClientRect();
    
        if (clientX < left) {
            closeCartModal();
        } else if (clientX > left + width) {
            closeCartModal();
        } else if (clientY > top) {
            closeCartModal();
        }
    }

    return (
        <div className="w-[100%] backdrop-blur-[8px] sticky top-0 bg-light-theme-secondary-bg dark:bg-dark-theme-secondary-bg transition-colors duration-300 ease-in-out z-50">
            <div className='hidden lg:block'>
                <div className="custom-container py-3 items-center grid grid-flow-col auto-cols-max justify-between relative">
                    <img src={headerLogo} alt='main logo' className='h-[28px] lg:h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                    <div>
                        <div className=' w-[100%] grid grid-flow-col gap-3 items-center'>
                            {/* <Button text={'navigation'} color={'#ec5e2a'} textColor={'white'} icon={dotsIcon}/> */}
                            <NavButton text={'navigation'} type={ButtonEnum.PRIMARY} icon={dotsIcon} onClick={()=>navigate("/all-categories")}/>
                            <NavSearch/>
                            <>
                                <NavButton text={'cart'} type={ButtonEnum.DEFAULT} icon={lightMode ? cartIcon : cartIconDark} cartItems={cartItems.length} onClick={handleCartClick} onMouseEnter={showCartModal} onMouseLeave={handleMouseLeave}  /*onMouseEnter={showCartModal} onMouseLeave={closeCartModal}*//>
                                {cartModal && <CartModal closeModal={handleMouseLeaveModal}/>}
                            </>
                            <div>
                                {authStage !== AuthStageEnum.AUTHORIZED ? <>
                                        <NavButton text={'log.in'} type={ButtonEnum.DEFAULT} icon={lightMode ? userIcon : userIconDark} onClick={showLoginModal}/>
                                        <LogInModal modalOpen={loginModalOpen} closeModal={closeLoginModal}/> 
                                    </> : <>
                                        <NavButton text={'profile'} type={ButtonEnum.DEFAULT} icon={lightMode ? userIcon : userIconDark} onClick={()=>navigate("/profile")}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='block lg:hidden'>
                <div className='custom-container py-3 relative'>
                    <div className='grid grid-flow-col items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='w-6 mr-2'>
                                <img src={ categoriesTabModal ? (lightMode ? burgerCloseIcon : burgerCloseIconDark) : (lightMode ? burgerIcon : burgerIconDark)} alt='categories burger logo' className='w-auto cursor-pointer block ml-auto' onClick={()=>{!categoriesTabModal ? showCategoriesTabModal() : closeCategoriesTabModal()}}/>
                            </div>
                            <img src={headerLogo} alt='main logo' className='h-[28px] lg:h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                        </div>
                        <div>
                            <img src={lightMode? searchIcon : searchIconDark} alt='search icon' className='w-6 cursor-pointer' onClick={()=>{!searchInput ? showSearchInput() : closeSearchInput()}}/>
                            <img src={lightMode ? cartIcon : cartIconDark} alt='cart icon' className='ml-5 w-6 cursor-pointer' onClick={() => navigate('/cart')}/>
                        </div>
                    </div>
                    {searchInput && <NavSearch/>}
                    {<CategoriesTabMobile isOpen={categoriesTabModal}/>}
                </div>
            </div>
        </div>
    )
}
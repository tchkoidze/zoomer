import React, {useEffect } from 'react'
import { Form, Input, Select} from 'antd';
import FullPriceCard from '@src/components/FullPriceCard/FullPriceCard';
import { FormattedMessage, useIntl } from 'react-intl';
import goBackIcon from '@src/assets/icons/light/category-left-arr.png'
import goBackIconDark from '@src/assets/icons/dark/category-left-arr.png'
import { useNavigate } from 'react-router-dom';
import MobilePurchaseCard from '@src/views/BuyPage/MobilePurchaseCard/MobilePurchaseCard';
import { usePurchaseProvider } from '@src/providers/PurchaseProvider/usePurchaseProvider';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import { cityOption } from '@src/@types/types';

interface AddressFormValues {
    city: string;
    address: string;
}

const cityOptions:cityOption[] = [
    {
        id: "city-1",
        name: <FormattedMessage id='tbilisi'/>,
        value: "tbilisi",
    },
    {
        id: "city-2",
        name: <FormattedMessage id='kutaisi'/>,
        value: "kutaisi",
    },
    {
        id: "city-3",
        name: <FormattedMessage id='batumi'/>,
        value: "batumi",
    },
    {
        id: "city-4",
        name: <FormattedMessage id='gori'/>,
        value: "gori",
    },
    {
        id: "city-5",
        name: <FormattedMessage id='telavi'/>,
        value: "telavi",
    },
    {
        id: "city-6",
        name: <FormattedMessage id='gurjaani'/>,
        value: "gurjaani",
    },
    {
        id: "city-7",
        name: <FormattedMessage id='zugdidi'/>,
        value: "zugdidi",
    },
    {
        id: "city-8",
        name: <FormattedMessage id='poti'/>,
        value: "poti",
    }
]

export default function AddressForm({setOnAddress}: {setOnAddress: (value: React.SetStateAction<boolean>) => void}) {
    const {totalPurchasePrice} = usePurchaseProvider();
    const { Option } = Select;
    const [addressForm] = Form.useForm();
    const {formatMessage} = useIntl();
    const navigate = useNavigate();
    const {lightMode} = useThemeProvider();

    function addressFormFinish() {
        localStorage.setItem("city", addressForm.getFieldValue("city"))
        localStorage.setItem("address", addressForm.getFieldValue("address"))
        setOnAddress(false);
    }

    function handleClick() {
        addressForm.submit();
    }

    useEffect(()=> {
        if (localStorage.getItem("address") && localStorage.getItem("city")) {
            addressForm.setFieldValue("city", localStorage.getItem("city"))
            addressForm.setFieldValue("address", localStorage.getItem("address"))
        }
    }, []) // load form values from the local storage on inital render

    return (
        <div className='flex w-full flex-col lg:flex-row custom-container'>
            <div className='w-full'>
                <div className='inline-flex items-center mb-[30px] cursor-pointer' onClick={()=>{navigate(-1)}}>
                    <img alt='go back icon' src={lightMode ? goBackIcon : goBackIconDark} className='h-full mr-[20px]' />
                    <h2 className='firago-bold text-base leading-[19px] text-black-08 dark:text-dark-black-8'><FormattedMessage id="go.back"/></h2>
                </div>
                <Form<AddressFormValues>
                    form={addressForm}
                    name="purchase_form"
                    onFinish={addressFormFinish}
                    style={{ width: '100%'}}
                    //scrollToFirstError
                >
                    <Form.Item name="city" rules={[{ required: true, message: <FormattedMessage id='please.enter.city'/>}]} className='custom-select'>
                        <Select
                            placeholder={formatMessage({id: "select.city"})}
                            allowClear
                            
                        >
                            {cityOptions.map(cityOpt => {
                                return <Option key={cityOpt.id} value={cityOpt.value}>{cityOpt.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item className="custom-input" name="address" rules={[{ required: true, message: <FormattedMessage id='please.enter.address'/> }]}>
                        <Input placeholder={formatMessage({id: "enter.address"})}/>
                    </Form.Item>
                </Form>
            </div>
            <div className='hidden lg:block min-w-[400px] ml-[50px]'>
                    <FullPriceCard fullPrice={totalPurchasePrice} onClick={handleClick} buttonText="next"/>
            </div>
            <div className='block lg:hidden w-full absolute left-0 top-[300px]'>
                <MobilePurchaseCard fullPrice={totalPurchasePrice} onClick={handleClick} buttonText='next'/>
            </div>
        </div>
    )
}

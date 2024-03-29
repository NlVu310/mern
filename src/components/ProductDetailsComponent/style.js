import { Col, Image, InputNumber } from "antd"
import styled from "styled-components"

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px !important;
    width: 64px !important;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset !important;
    display: flex !important;
`
export const WrapperStyleNameProduct = styled.h1`
    margin-top: 0px;
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`
export const WrapperTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`
export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`
export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
`
export const WrapperAddressProduct = styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsisl;
    }

    `

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-itmes: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 130px;
    height: 30px;
    justify-content: center;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number  {
        width: 40px;
        border-top: 0;
        border-bottom: 0;  
        &.ant-input-number .ant-input-number-handler-wrap .ant-input-number-handler{
            display:none !important
        } 
    }
`
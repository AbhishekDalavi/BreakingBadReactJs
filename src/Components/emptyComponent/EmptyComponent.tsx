import React from "react";
import { AppColors, AppFontFamily, AppFonts } from "../../shared/Constants/AppConstants";
import './empty.style.css';

interface EmptyModal {
    Title: string,
    subTitle: string,
    btnText?: string,
    showBtn?: boolean,
    onBtnClick?: () => void
}
const EmptyComponent:React.FC<EmptyModal> = ({Title, subTitle, btnText, showBtn, onBtnClick}) =>{
    return(
        <div>
            <div className="noDataStyle">
                <h2 style={{fontFamily: AppFontFamily.RobotoBold, color: AppColors.white, textTransform: 'capitalize'}}>{Title ? Title : ''}</h2>
                <span style={styles.subTitleStyle}>{subTitle ? subTitle : ''}</span>
                {showBtn ? <div style={{marginTop: 15}}>
                    <button onClick={()=> onBtnClick ? onBtnClick() : null} className="btnContainer" style={styles.btnStyle}>
                        <span style={styles.btnTextStyle}>{btnText ? btnText : ''}</span>
                    </button>
                </div>
                : null}
            </div>
        </div>
    )
}

export default EmptyComponent;

const styles = {
    subTitleStyle: {
        fontSize: AppFonts.FontSize16, 
        fontFamily: AppFontFamily.RobotoRegular, 
        color: AppColors.white
    },
    btnStyle:{
        background: AppColors.black, 
        borderColor: AppColors.green, 
    },
    btnTextStyle:{
        fontSize: AppFonts.FontSize16, 
        fontFamily: AppFontFamily.RobotoRegular, 
        color: AppColors.green
    }
}
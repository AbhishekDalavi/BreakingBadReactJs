import React from "react";
import { AppColors, AppFontFamily, AppFonts } from "../shared/Constants/AppConstants";

const EmptyComponent = (props) =>{
    const {Title, subTitle, btnText, showBtn, onBtnClick} = props;
    return(
        <div>
            <div className="noDataStyle">
                <h2 style={styles.TitleStyle}>{Title ? Title : ''}</h2>
                <span style={styles.subTitleStyle}>{subTitle ? subTitle : ''}</span>
                {showBtn ? <div style={{marginTop: 15}}>
                    <button onClick={onBtnClick ? ()=> onBtnClick() : null} style={styles.btnStyle}>
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
    TitleStyle: {
        fontFamily: AppFontFamily.RobotoBold, 
        color: AppColors.white, 
        textTransform: 'capitalize'
    },
    subTitleStyle: {
        fontSize: AppFonts.FontSize16, 
        fontFamily: AppFontFamily.RobotoRegular, 
        color: AppColors.white
    },
    btnStyle:{
        background: AppColors.black, 
        borderWidth: 0.5, 
        borderColor: AppColors.green, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 5, 
        paddingBottom: 5,
        borderRadius: 5
    },
    btnTextStyle:{
        fontSize: AppFonts.FontSize16, 
        fontFamily: AppFontFamily.RobotoRegular, 
        color: AppColors.green
    }
}
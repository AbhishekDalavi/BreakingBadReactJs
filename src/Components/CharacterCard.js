import React from "react";
import { AppColors, AppFontFamily, AppFonts } from "../shared/Constants/AppConstants";

const CharacterCard = (props) => {
    const { characterItem, index, screenWidth, onFavoriteClick, onCardClick, windowWidth} = props;

       return (
        <div key={`${characterItem.name}_${index}_Characters`} className="mainCardContainer cursorStyle col-lg-4 col-md-6 col-sm-12"
            onClick={onCardClick ? () => onCardClick(characterItem) : null}>
            
            <div style={{ margin: 8 }}>
                {(characterItem.img) ? <img src={characterItem.img} className="cardImgStyle" />
                :
                <img src={require('../Images/No_Image_Available.jpg')} className="charcterDetailImg" /> 
                }
            </div>
            <div className="cardContentStyle">
                <div className="cardRowContainer" style={{ textAlign: 'left' }}>
                    <div className="nameContainer">
                        <div>
                            <span className="cardTitleStyle" style={styles.nameText}>{characterItem.name}</span>
                        </div>
                        <div>
                            <span className="cardTitleStyle" style={styles.nicknameText}>{characterItem.nickname}</span>
                        </div>
                    </div>
                    <div className="favoriteContainer" onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteClick(index, characterItem);
                         }}>
                        {characterItem.isFavorite ?
                            <img src={require("../Images/HEART_FILLED.svg").default} className="favouriteStyle" />
                            :
                            <img src={require("../Images/HEART.svg").default} className="favouriteStyle" />}
                    </div>
                </div>
                <div className="headerContainer" style={{ marginTop: (screenWidth <= 590) ? 10 : 20 }}>
                    <div>
                        <span className="cardSubTitleStyle" style={styles.portrayedTitleStyle}>portrayed</span>
                    </div>
                    <div>
                        <span className="cardSubTitleStyle" style={styles.portrayedStyle}>{characterItem.portrayed}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CharacterCard;

const styles = {
    nameText: {
        fontFamily: AppFontFamily.RobotoBold,
        color: AppColors.white,
        textTransform: 'capitalize'
    },
    nicknameText: {
        fontFamily: AppFontFamily.RobotoLight,
        color: AppColors.white,
        textTransform: 'capitalize'
    },
    portrayedTitleStyle: {
        fontFamily: AppFontFamily.RobotoSemiBold,
        color: AppColors.green,
        textTransform: 'capitalize'
    },
    portrayedStyle: {
        fontFamily: AppFontFamily.RobotoLight,
        color: AppColors.white,
        marginLeft: 15,
        textTransform: 'capitalize'
    }
}

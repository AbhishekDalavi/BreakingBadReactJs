import React from "react";
import { AppColors, AppFontFamily } from "../shared/Constants/AppConstants";
import { CharacterModal } from "../shared/InterFaces/InterFaceList";

type cardPropsModal={
    characterItem: CharacterModal,
    index: number,
    screenWidth: number,
    windowWidth?: number,
    onFavoriteClick: (index:number, characterItem: CharacterModal)=>void,
    onCardClick:(characterItem: CharacterModal)=>void

}
const CharacterCard: React.FC <cardPropsModal> = (props) => {
    const { characterItem, index, screenWidth, onFavoriteClick, onCardClick, windowWidth} = props;

       return (
        <div key={`${characterItem.char_id}_${index}_Characters`} className="mainCardContainer cursorStyle col-lg-4 col-md-6 col-sm-12"
            onClick={ () => onCardClick ? onCardClick(characterItem) : null}>
            
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
    },
    nicknameText: {
        fontFamily: AppFontFamily.RobotoLight,
        color: AppColors.white,
    },
    portrayedTitleStyle: {
        fontFamily: AppFontFamily.RobotoSemiBold,
        color: AppColors.green,
    },
    portrayedStyle: {
        fontFamily: AppFontFamily.RobotoLight,
        color: AppColors.white,
        marginLeft: 15,
    }
}

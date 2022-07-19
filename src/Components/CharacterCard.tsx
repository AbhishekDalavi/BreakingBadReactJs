import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store/store";
import { AppColors, AppFontFamily } from "../shared/Constants/AppConstants";
import { CharacterModal } from "../shared/InterFaces/InterFaceList";

type cardPropsModal={
    characterItem: CharacterModal,
    index: number,
    screenWidth: number,
    onFavoriteClick: (index:number, characterItem: CharacterModal, isRemovedFavorite: boolean)=>void,
    onCardClick:(characterItem: CharacterModal)=>void

}
const CharacterCard: React.FC <cardPropsModal> = (props) => {
    const favoriteCharacterList = useSelector((state: RootState)=> state.commonReducer.favoriteCharacterList); 

    const { characterItem, index, screenWidth, onFavoriteClick, onCardClick} = props;
    const isIdxAvailable = favoriteCharacterList.findIndex((item: CharacterModal)=>item.char_id === characterItem.char_id);

       return (
        <div key={`${characterItem.char_id}_${index}_Characters`} className="mainCardContainer cursorStyle col-lg-4 col-md-6 col-sm-12"
            onClick={ () => onCardClick ? onCardClick(characterItem) : null}>
            
            <div style={{ margin: 8 }}>
                {(characterItem.img) ? <img src={characterItem.img} className="cardImgStyle" alt="no-img"/>
                :
                <img src={require('../Images/No_Image_Available.jpg')} className="charcterDetailImg" alt="no-img"/> 
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
                       {(isIdxAvailable !== -1) ? <div className="favoriteContainer" onClick={(e) => {
                           e.stopPropagation();
                           onFavoriteClick(index, characterItem, true);
                       }}>
                           <img src={require("../Images/HEART_FILLED.svg").default} className="favouriteStyle" alt="no-img"/>

                       </div>
                           :
                           <div className="favoriteContainer" onClick={(e) => {
                               e.stopPropagation();
                               onFavoriteClick(index, characterItem, false);
                           }}>
                               <img src={require("../Images/HEART.svg").default} className="favouriteStyle" alt="no-img"/>
                           </div>}

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

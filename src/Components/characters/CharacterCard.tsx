import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";
import { CharacterModal } from "../../shared/InterFaces/InterFaceList";
import './character.style.css';

type cardPropsModal={
    characterItem: CharacterModal,
    index: number,
    onFavoriteClick: (index:number, characterItem: CharacterModal, isRemovedFavorite: boolean)=>void,
    onCardClick:(characterItem: CharacterModal)=>void

}
const CharacterCard: React.FC <cardPropsModal> = (props) => {
    const favoriteCharacterList = useSelector((state: RootState)=> state.commonReducer.favoriteCharacterList); 

    const { characterItem, index, onFavoriteClick, onCardClick} = props;
    const isIdxAvailable = favoriteCharacterList.findIndex((item: CharacterModal)=>item.char_id === characterItem.char_id);

       return (
        <div key={`${characterItem.char_id}_${index}_Characters`} className="mainCardContainer cursorStyle col-lg-4 col-md-6 col-sm-12"
            onClick={ () => onCardClick ? onCardClick(characterItem) : null}>
            
            <div style={{ margin: 8 }}>
                {(characterItem.img) ? <img src={characterItem.img} className="cardImgStyle" alt="no-img"/>
                :
                <img src={require('../../Images/No_Image_Available.jpg')} className="charcterDetailImg" alt="no-img"/> 
                }
            </div>
            <div className="cardContentStyle">
                <div className="cardRowContainer" style={{ textAlign: 'left' }}>
                    <div className="nameContainer">
                        <div>
                            <span className="cardTitleStyle roboto-bold white-color">{characterItem.name}</span>
                        </div>
                        <div>
                            <span className="cardTitleStyle roboto-light white-color">{characterItem.nickname}</span>
                        </div>
                    </div>
                       {(isIdxAvailable !== -1) ? <div className="favoriteContainer" onClick={(e) => {
                           e.stopPropagation();
                           onFavoriteClick(index, characterItem, true);
                       }}>
                           <img src={require("../../Images/HEART_FILLED.svg").default} className="favouriteStyle" alt="no-img"/>

                       </div>
                           :
                           <div className="favoriteContainer" onClick={(e) => {
                               e.stopPropagation();
                               onFavoriteClick(index, characterItem, false);
                           }}>
                               <img src={require("../../Images/HEART.svg").default} className="favouriteStyle" alt="no-img"/>
                           </div>}

                </div>
                <div className="headerContainer" style={{ marginTop: 10}}>
                    <div>
                        <span className="cardSubTitleStyle roboto-semi-bold green-color">portrayed</span>
                    </div>
                    <div>
                        <span className="cardSubTitleStyle roboto-light white-color" style={{marginLeft: 15}}>{characterItem.portrayed}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CharacterCard;

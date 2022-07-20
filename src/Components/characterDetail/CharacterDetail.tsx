import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCharacters } from "../../Redux/actions/commonAction";
import { RootState, useAppDispatch } from "../../Redux/store/store";
import { CharacterModal } from "../../shared/InterFaces/InterFaceList";
import './characterDetail.style.css';
const windowWidth = window.innerWidth;

type LocationState = {
    characterItem: CharacterModal,
    isFromFavorite: boolean
  }

const CharacterDetail = () =>{

    const [character, setCharacter] = useState<CharacterModal>(null!);
    const [stateUpdater, setStateUpdater] = useState<boolean>(false);
    const [isFromFavorite, setIsFromFavorite] = useState(false);
    const [otherCharacterList, setOtherCharacterList] = useState<CharacterModal[]>([]);
    const characterList = useSelector((state:RootState)=>state.commonReducer.characters);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

/******************************************************************************UseEffect start ******************************************************* */

    useEffect(()=>{
        if (characterList && characterList.length <= 0) {
            const url = 'characters';
            dispatch(getAllCharacters('GET', url, null));
        }

        if (location.state) {
            const { characterItem, isFromFavorite } = location.state as LocationState;
            setCharacter(characterItem);
            setIsFromFavorite(isFromFavorite);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(characterList.length > 0 && character){
            const getOthercharArray = characterList.filter((item:CharacterModal)=>(item.char_id === character.char_id+1) || (item.char_id === character.char_id+2) || (item.char_id === character.char_id+3) )
            if(getOthercharArray.length > 0){
                setOtherCharacterList(getOthercharArray);
            }else{
                setOtherCharacterList([]);
            }
        }

    },[characterList, character])

/******************************************************************************Image OverLay Style ******************************************************* */

    const myStyle=(characterItem:CharacterModal)=>{
    return{
        backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, #000000 78.62%), url(${characterItem.img})`,
        height:'100vh',
        marginTop: -40,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
}
/******************************************************************************Render Image View ******************************************************* */

    const renderImageView= () =>{
        return(
            <div className="overlay col-lg-6 col-md-12" style={myStyle(character)}>
                <img src={require('../../Images/left-arrow.svg').default} alt="no-img" className="cursorStyle transitionStyle" onClick={()=> isFromFavorite ? navigate('/favoriteList') : navigate('/')} 
                        style={{ position: 'absolute',top: (windowWidth <= 640) ? 60 : 80, left: (windowWidth <= 640) ? 20 : 50}}/>
                <div style={{ marginTop: 90 }}>
                    <div className="charcterSubImgStyle">
                        {(character.img) ? <img src={character.img} className="charcterDetailImg" alt="no-img" />
                        :
                        <img src={require('../../Images/No_Image_Available.jpg')} className="charcterDetailImg" alt="no-img" /> 
                        }                       
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <span className="imgNameStyle roboto-bold white-color">{character.name}</span>
                    </div>
                    <div>
                        <span className="imgNickName roboto-light white-color">{character.nickname}</span>
                    </div>
                </div>
            </div>
        );
    }
/******************************************************************************RenderDescription View ******************************************************* */

    const renderDescriptionView = () =>{
        return(
            <div className="detailSubContainer" >
                <div className="detailDescContainer">
                    <div className="potrayedContainer charDetailmargin">
                        <div className="subRowContainer">
                            <span className="cardTitleStyle roboto-semi-bold green-color">Potrayed</span>
                            <span className="descSubtitleStyle roboto-light white-color">{character.portrayed}</span>
                        </div>
                        <div className="dobContainer">
                            <img src={require('../../Images/dob.svg').default} className="dobStyle" alt="no-img" />
                            <span  className="cardTitleStyle roboto-light white-color">{character.birthday !== 'Unknown' ? character.birthday : 'N/A'}</span>
                        </div>
                    </div>
                    <div className="charDetailmargin">
                        <div className="subRowContainer">
                            <span className="cardTitleStyle roboto-semi-bold green-color">Occupation</span>
                            <span className="descSubtitleStyle roboto-light white-color">{(character.occupation && character.occupation.length > 0) ? character.occupation.join(", ") : null}</span>
                        </div>
                    </div>
                    <div className="subRowContainer charDetailmargin charDetailmarginTop">
                        <span className="cardTitleStyle roboto-semi-bold green-color">Appeared in</span>
                        {(character.appearance && character.appearance.length > 0) ? <div className="OtherCharacterContainer">
                            {character.appearance.map((item, idx) => {
                                return (
                                    <div className="seasonContainer" key={`${idx}_appearance`}>
                                        <span className="descSubtitleStyle roboto-light white-color">{`Season ${item}`}</span>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <span className="descSubtitleStyle roboto-light white-color">{`Not appeared in any seasons`}</span>
                        }
                    </div>
                </div>
                <div className="subRowContainer">
                    <span className="cardTitleStyle roboto-bold white-color" style={{marginBottom: 20}}>{(otherCharacterList.length > 0) ? `Other characters` : 'No Other characters'}</span>
                    <div className="OtherCharacterContainer">
                    {otherCharacterList.length > 0 && otherCharacterList.map((otherCharItem, index) => {
                        const {img, name, nickname} = otherCharItem;
                        return (
                            <div style={{marginRight: 40}} key={`${index}_otherCharacterList`} onClick={()=>{
                                setCharacter(otherCharItem);
                                setStateUpdater(!stateUpdater);
                            }}>
                                <div style={{marginBottom: 10}}>
                                    {img ? <img src={img} className="cardImgStyle" alt="no-img" />
                                    :
                                    <img src={require('../../Images/No_Image_Available.jpg')} className="charcterDetailImg" alt="no-img" /> 
                                    }
                                </div>
                                <div className="subRowContainer">
                                    <span className="roboto-bold white-color" style={{fontSize: 16}}>{name}</span>
                                    <span className="roboto-light white-color" style={{fontSize: 14}}>{nickname}</span>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        )
    }

    return(
        character ? <div className="detailRowContainer">
                {renderImageView()}
                {renderDescriptionView()}
        </div>
            :
            null
    );
}

export default CharacterDetail;



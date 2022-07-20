import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store/store";
import { CharacterModal } from "../../shared/InterFaces/InterFaceList";
import CharacterCard from "./CharacterCard";
import EmptyComponent from "../emptyComponent/EmptyComponent";
import LoadingSpinner from "../Loader/Spinner";
import './character.style.css';

const FavoriteList = () => {

    const navigate = useNavigate();
    const charactersList = useSelector((state: RootState) => state.commonReducer.characters);
    const favoriteCharacterList = useSelector((state: RootState)=> state.commonReducer.favoriteCharacterList); 

    const [stateUpdater, setStateUpdater] = useState<boolean>(false);
    const [favoriteList, setFavoriteList] = useState<CharacterModal[]>([]);
    const [loader, setLoader] = useState(false);

/******************************************************************************UseEffect Start ******************************************************* */

    useEffect(() => {
        setLoader(true);
        if (charactersList&& charactersList.length > 0) {
            (favoriteCharacterList.length > 0) ? setFavoriteList(favoriteCharacterList) : setFavoriteList([]);
            setLoader(false);
        }
        return () => {
            setFavoriteList([]);
            setStateUpdater(!stateUpdater);
            setLoader(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


/******************************************************************************Rendr Header ******************************************************* */

    const renderHeader = () => {
        return (
            <div className="cardRowContainer heaaderWrapper">
                <div>
                    <Link to={'/'}> <img src={require('../../Images/left-arrow.svg').default} alt="no-img"/> </Link>
                </div>
                <div className="favheaderContainer" >
                    <img src={require('../../Images/Vector.svg').default} alt="no-img"/>
                    <span className="headerM-l cardTitleStyle roboto-bold white-color">The Breaking bad</span>
                </div>
                <div>
                    <span className="cardTitleStyle roboto-regular green-color">Favourites</span>
                </div>
            </div>
        )
    }
/******************************************************************************Rendr Favorite Character Cards ******************************************************* */

    const renderCharacterList = () => {
        return (
            <div className="mainStyle">
                {favoriteList.map((item, index) => {
                    return (<CharacterCard
                        characterItem={item}
                        index={index}
                        onCardClick={(characterItem: CharacterModal)=>navigate('/characterDetail', {state: {characterItem, isFromFavorite: true} })}
                        onFavoriteClick={(selectedIndex, selectedItem, isRemovedFavorite)=>{
                            if(isRemovedFavorite) {
                                const itemIndex = favoriteCharacterList.findIndex((favItem: CharacterModal)=>favItem.char_id === selectedItem.char_id);
                                if(itemIndex !== -1){
                                    favoriteCharacterList.splice(itemIndex, 1);
                                }
                            }
                            setStateUpdater(!stateUpdater);
                        }}
                    />)
                })}
            </div>
        );
    }

    return (
        loader ? 
        <LoadingSpinner/>
        :
        <div className="mainContainer">
            {renderHeader()}
            {favoriteList.length > 0 ?
                renderCharacterList()
                :
                <EmptyComponent
                    Title={'No Data Found'}
                    subTitle={'There is no Favorite characters available'}
                />
            }
        </div>
    );
}

export default FavoriteList;

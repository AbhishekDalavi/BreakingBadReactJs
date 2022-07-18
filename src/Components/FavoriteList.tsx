import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store/store";
import { AppColors, AppFontFamily } from "../shared/Constants/AppConstants";
import { CharacterModal } from "../shared/InterFaces/InterFaceList";
import CharacterCard from "./CharacterCard";
import EmptyComponent from "./EmptyComponent";
import LoadingSpinner from "./Spinner";

type LocationState = {
    favoriteList: CharacterModal[]
  }

const FavoriteList: React.FC = (props) => {

    const width = (window.innerWidth < 640 ? window.innerWidth - 30 : (window.innerWidth >= 641 && window.innerWidth <= 768) ? window.innerWidth/3-30 : 
        (window.innerWidth >= 768 && window.innerWidth <= 1200) ? window.innerWidth/2-30 : (window.innerWidth >= 1201 && window.innerWidth <= 1420) ? window.innerWidth/3-40 : window.innerWidth/3-80 ) ;
    const windowWidth = window.innerWidth;

    const location = useLocation();
    const navigate = useNavigate();
    const charactersList = useSelector((state: RootState) => state.commonReducer.characters);
    // const loader = useSelector(state => state.commonReducer.loadingCharacters);

    const [stateUpdater, setStateUpdater] = useState<boolean>(false);
    const [favoriteList, setFavoriteList] = useState<CharacterModal[]>([]);
    const [loader, setLoader] = useState(false);

/******************************************************************************UseEffect Start ******************************************************* */

    useEffect(() => {
        setLoader(true);
        if (location&& location.state) {
            const { favoriteList } = location.state as LocationState;
            setFavoriteList(favoriteList);
            setLoader(false);
        }
        return () => {
            setFavoriteList([]);
            setStateUpdater(!stateUpdater);
            setLoader(false);
        }
    }, [])

    useEffect(() => {
        if (favoriteList.length > 0) {
            const updatedFavList = favoriteList.filter((item, idx) => item.isFavorite)
            if (updatedFavList.length > 0) {
                setFavoriteList(updatedFavList)
            }
            else {
                setFavoriteList([]);
            }
        }
    }, [stateUpdater, favoriteList])

/******************************************************************************Rendr Header ******************************************************* */

    const renderHeader = () => {
        return (
            <div className="cardRowContainer heaaderWrapper">
                <div>
                    <Link to={'/'}> <img src={require('../Images/left-arrow.svg').default} /> </Link>
                </div>
                <div className="favheaderContainer" >
                    <img src={require('../Images/Vector.svg').default} />
                    <span className="headerM-l cardTitleStyle" style={styles.headerText}>The Breaking bad</span>
                </div>
                <div>
                    <span className="cardTitleStyle" style={styles.favoriteTextStyle}>Favourites</span>
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
                        screenWidth={width}
                        windowWidth={windowWidth}
                        onCardClick={(characterItem: CharacterModal)=>navigate('/characterDetail', {state: {characterItem} })}
                        onFavoriteClick={(selectedIndex: number, selectedItem: CharacterModal) => {
                            const obj = { ...selectedItem, "isFavorite": !selectedItem.isFavorite }
                            favoriteList.splice(selectedIndex, 1, obj);
                            const selectedCharIdx = (Number(selectedItem.char_id) -1)
                            charactersList.splice(selectedCharIdx, 1, obj);
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

const styles = {
    headerText: {
        fontFamily: AppFontFamily.RobotoBold,
        color: AppColors.white,
        // marginLeft: 20,
    },
    favoriteTextStyle: {
        fontFamily: AppFontFamily.RobotoRegular,
        color: AppColors.green,
    },

}

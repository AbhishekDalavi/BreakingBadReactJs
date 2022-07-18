import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCharacters } from "../Redux/actions/commonAction";
import { RootState, useAppDispatch } from "../Redux/store/store";
import { AppColors, AppFontFamily } from "../shared/Constants/AppConstants";
import { CharacterModal } from "../shared/InterFaces/InterFaceList";
import CharacterCard from "./CharacterCard";
import EmptyComponent from "./EmptyComponent";
import LoadingSpinner from "./Spinner";

const CharacterList = (props:any) => {
    const width:number = (window.innerWidth < 640 ? window.innerWidth - 30 : (window.innerWidth >= 641 && window.innerWidth <= 768) ? window.innerWidth/3-30 : 
        (window.innerWidth >= 768 && window.innerWidth <= 1200) ? window.innerWidth/2-30 :(window.innerWidth >= 1201 && window.innerWidth <= 1420) ? window.innerWidth/3-40 : window.innerWidth/3-80 ) ;
    
    const windowWidth:number = window.innerWidth;
    const dispatch = useAppDispatch();
    const charactersList = useSelector((state:RootState)=> state.commonReducer.characters); 
    const searchedCharactersList = useSelector((state: RootState)=> state.commonReducer.searchedCharacters); 
    const loader = useSelector((state: RootState)=> state.commonReducer.loadingCharacters);

    const [stateUpdater, setStateUpdater] = useState<boolean>(false);
    const [favoriteList, setFavoriteList] = useState<CharacterModal[]>([]);
    const [characterArray, setCharacterArray] = useState<CharacterModal[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [isSearchVisible, setisSearchVisible] = useState<boolean>(false);

    const navigate = useNavigate();

/******************************************************************************UseEffect Start ******************************************************* */

    useEffect(()=>{
        const url= 'characters';
      if(charactersList && charactersList.length > 0){
        setCharacterArray(charactersList);
      } else{
         dispatch(getAllCharacters('GET', url, null, false));
      }
      return()=>{
       resetData();
      }
    },[])

    const resetData=()=>{
        setisSearchVisible(false);
        setSearchText('');
    }

    useEffect(()=>{
        searchText && setCharacterArray(searchedCharactersList) ;
        (characterArray.length <= 0 && !searchText) && setCharacterArray(charactersList);

        const FavoriteCharList = charactersList.filter((item:CharacterModal,index:number)=> item.isFavorite);
        if(FavoriteCharList.length > 0){
            setFavoriteList(FavoriteCharList);
        }
        else{
            setFavoriteList([]);
        }

    },[stateUpdater,charactersList, searchedCharactersList])

/******************************************************************************Search bar onChange ******************************************************* */

    const onchangeText = (value:string) =>{
        const url= value ?`characters?name=${value}` : 'characters';
        if(value){
        setSearchText(value);
        setTimeout(() => {
            dispatch(getAllCharacters('GET', url, null, true))
        }, 500);
        }else{
            setSearchText('');
            setTimeout(() => {
                setCharacterArray(charactersList);
            }, 500);
        }
    }
/******************************************************************************Rendr Header ******************************************************* */
    const renderHeader = () =>{
        return(
            <div className="cardRowContainer heaaderWrapper">
                <div className="headerContainer">
                    <img src={require('../Images/Vector.svg').default}/>
                    {(isSearchVisible && windowWidth <= 768 ) ? undefined : <span className="headerM-l cardTitleStyle" style={styles.headerText}>The Breaking bad</span>}
                </div>
                <div className="headerContainer">
                    {isSearchVisible ? <div className="searchBoxStyle">
                        <input style={styles.searchBoxContainer}
                            className="searchInputStyle descSubtitleStyle"
                            type={'text'}
                            autoFocus
                            value={searchText}
                            autoComplete={'false'}
                            placeholder={"Search here..."}
                            onChange={(e) => onchangeText(e.target.value)}
                            onSubmit={() => onchangeText(searchText) }
                        />
                        <img src={require('../Images/search.svg').default} className="cursorStyle transitionStyle" onClick={()=>{
                            setCharacterArray(charactersList);
                            resetData();}}/>
                    </div>
                    :
                    <img src={require('../Images/search.svg').default} className="cursorStyle transitionStyle" style={{marginRight: (windowWidth < 380) ? 20 : 40}} onClick={()=>setisSearchVisible(true)}/>
                    }
                    <img src={require('../Images/HEART_FILLED.svg').default} className="cursorStyle transitionStyle" onClick={()=>navigate('/favoriteList',{state: {favoriteList}})}/>
                </div>
            </div>
            
        );
    }

/******************************************************************************Rendr Character Cards ******************************************************* */
    const renderCharacterList = () =>{
        return(
            <div className="mainStyle">
            {characterArray.map((item,index)=>{
                return(<CharacterCard 
                        characterItem={item} 
                        index={index} 
                        screenWidth={width}
                        windowWidth= {windowWidth}
                        onCardClick={(characterItem)=>{navigate('/characterDetail', {state: {characterItem} })}}
                        // onCardClick={(characterItem:CharacterModal)=>{}}
                        onFavoriteClick={(selectedIndex, selectedItem)=>{
                            const obj = {...selectedItem, "isFavorite": !selectedItem.isFavorite}
                            characterArray.splice(selectedIndex, 1, obj);
                            const selectedCharIdx = (Number(selectedItem.char_id) -1)
                            searchText ? charactersList.splice(selectedCharIdx, 1, obj) : charactersList.splice(selectedIndex, 1, obj);
                            searchedCharactersList.splice(selectedIndex, 1, obj);
                            setStateUpdater(!stateUpdater);
                        }}
                        />)
            })}
            </div>
        );
    }

    return (
        
        <div className="mainContainer">
            {renderHeader()}
            {loader ?
                <div>
                    <LoadingSpinner />
                </div>
                :
                (!loader && characterArray.length > 0) ?
                    renderCharacterList()
                    :
                    <EmptyComponent
                        Title={'No Data Found'}
                        subTitle={'There is no characters available'}
                        showBtn
                        btnText={'Refresh'}
                        onBtnClick={() => {
                            resetData();
                            const url = 'characters';
                            dispatch(getAllCharacters('GET', url, null, false))
                        }}
                    />}
        </div>
    );
}

export default CharacterList;

const styles = {
    headerText: { 
        fontFamily: AppFontFamily.RobotoBold, 
        color: AppColors.white,
        // marginLeft: 20
    },
    searchBoxContainer: {
        fontFamily: AppFontFamily.RobotoRegular,
        color: AppColors.white
    }
}

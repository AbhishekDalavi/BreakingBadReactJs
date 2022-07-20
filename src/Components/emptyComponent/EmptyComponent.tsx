import React from "react";
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
                <h2 className="roboto-bold white-color" style={{textTransform: 'capitalize'}}>{Title ? Title : ''}</h2>
                <span className="roboto-regular white-color" style={{fontSize: 16}}>{subTitle ? subTitle : ''}</span>
                {showBtn ? <div style={{marginTop: 15}}>
                    <button onClick={()=> onBtnClick ? onBtnClick() : null} className="btnContainer" style={{ background: '#000000', borderColor: '#18CA75'}}>
                        <span className="roboto-regular green-color" style={{fontSize: 16}}>{btnText ? btnText : ''}</span>
                    </button>
                </div>
                : null}
            </div>
        </div>
    )
}

export default EmptyComponent;

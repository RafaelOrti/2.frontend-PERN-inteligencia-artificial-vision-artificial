import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';

import { mapExpressionToEmoji } from '../../helpers/emojis';

import './Results.css';

const Results = ({ results, processing }) => {

  // if(results[0].gender==="male"){
  //   results[0].gender="hombre";
  // }else{
  //   results[0].gender="mujer";
  // }
  
  if (processing && results) {
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {

    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
  
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div style={{ width: '300px' }}>
                  <p>
                    Uno de vosotros es {result.gender}, y parece que estáis {result.expressions.asSortedArray()[0].expression} y y parece que tenéis{' '}
                    {Math.round(result.age)} años
                  </p>
                  
                </div>
                
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.expressions.asSortedArray()[0].expression)} size="8x" />
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.gender)} size="8x" />
                
              </div>
              

            ))}
          </div>
        ) : (
          <div className="results__wrapper">
              <div className="results__wrapper__sub0">
                
                  
                <div className="results__wrapper__sub">
                  { results[0].gender==="male" &&
                    (
                      <p>Veo que eres hombre,</p>
                    )
                  }
                  { results[0].gender==="female" &&
                    (
                      <p>Veo que eres mujer,</p>
                    )
                  }
                  <p>creo que tienes {Math.round(results[0].age)} años,</p>
                  { results[0].expressions.asSortedArray()[0].expression==="happy" &&
                    (
                      <p>y parece que estás contento</p>
                      // <p>déjame recomendarte estas divertidas películas</p>
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="angry" &&
                    (
                      <div>
                      <p>y parece que estás enfadado </p>
                      
                      </div>
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="fearful" &&
                    (
                      <p>y parece que tienes miedo</p>
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="neutral" &&
                    (
                      
                    
                      <p>y parece que estás relajado </p>
                      
                    
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="sad" &&
                    (
                      
                     
                      <p>y parece que estás enfadado </p>
                      
                    
                      
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="surprised" &&
                    (
                      
                      <p>y parece que estás sorprendido</p>
                      
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="disgusted" &&
                    (
                      <p>y parece que estás disgustado</p>
                    )
                  }

                  { results[0].expressions.asSortedArray()[0].expression==="happy" && results[0].gender==="male"  && results[0].age<=25 &&
                    (
                      <p>eres un niño feliz déjame recomendarte peliculas</p>
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="angry" && results[0].gender==="male"&&  results[0].age>=25 &&
                    (
                      <p>eres demasiado mayor para estar enfadado</p>
                    )
                  }
                  { results[0].expressions.asSortedArray()[0].expression==="happy" && results[0].gender==="male"&&  results[0].age>=25 &&
                    (
                      <p>eres un señor feliz</p>
                    )
                  }
                  { !(results[0].expressions.asSortedArray()[0].expression==="happy" && results[0].gender==="male"  && results[0].age<=25) && !(results[0].expressions.asSortedArray()[0].expression==="angry" && results[0].gender==="male"&&  results[0].age>=25)&&
                    (
                      <p>déjame recomendarte unas películas</p>
                    )
                  }
                  
                  
                  
                  {/* <p>I think are a {results[0].expressions.angry}</p> */}
                  {/* <p>I think you are a {results[0]}</p> */}
                  {/* <div className="barraResults" style={{width:results[0].gender.expressions.angry}}></div> */}
                </div>
                <div className="results__emoji">
                  <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].expressions.asSortedArray()[0].expression)} color="blue" size="8x" />
                  <br />
                  {results[0].gender==="male" &&
                  <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].gender)} color="blue" size="8x" />
                  }
                  {results[0].gender==="female" &&
                  <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].gender)} color="pink" size="8x" />
                  }
                </div>
            </div>
            <div className="results__wrapper__bar0">
              <div className="results__wrapper__barText">
                <div className="textResults">Enfadado</div>
                <div className="textResults">Disgustado</div>
                <div className="textResults">Temeroso</div>
                <div className="textResults">Contento</div>
                <div className="textResults">Neutral</div>
                <div className="textResults">Triste</div>
                <div className="textResults">Sorprendido</div>
              </div>
              <div className="results__wrapper__bar">
                <div className="barraResults" style={{width:1+(results[0].expressions.angry*700)}}></div>
                <div className="barraResults" style={{width:1+(results[0].expressions.disgusted*700)}}></div>
                <div className="barraResults" style={{width:1+(results[0].expressions.fearful*700)}}></div>
                <div className="barraResults" style={{width:1+(results[0].expressions.happy*700)}}></div>
                <div className="barraResults" style={{width:1+(results[0].expressions.neutral *700)}}></div>
                <div className="barraResults" style={{width:1+(results[0].expressions.sad*700)}}></div>
                <div className="barraResults" style={{width:1+(results[0].expressions.surprised*700)}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
};

export default Results;

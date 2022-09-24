import './UserCurrentStat.scss'
import { useState } from 'react'

const expPerLevel = [0,200,400,800,1600,3200,6400,12800,25600,51200,102400,204800,409600,819200,1638400,3276800,6553600,13107200,26214400,52428800,104857600,209715200,419430400,838860800,1677721600,3355443200,6710886400,13421772800,26843545600,53687091200,107374182400,214748364800,429496729600,858993459200,1717986918400,3435973836800,6871947673600,13743895347200,27487790694400,54975581388800,109951162777600,219902325555200,439804651110400,879609302220800,1759218604441600,3518437208883200,7036874417766400,14073748835532800,28147497671065600,56294995342131200,112589990684262400,225179981368524800,450359962737049600,900719925474099200,1801439850948198400,3602879701896397000,7205759403792794000,14411518807585587000,28823037615171174000,57646075230342350000,115292150460684700000,230584300921369400000,461168601842738800000,922337203685477600000,1.8446744073709552e+21,3.6893488147419103e+21,7.378697629483821e+21,1.4757395258967641e+22,2.9514790517935283e+22,5.9029581035870565e+22,1.1805916207174113e+23,2.3611832414348226e+23,4.722366482869645e+23,9.44473296573929e+23,1.888946593147858e+24,3.777893186295716e+24,7.555786372591432e+24,1.5111572745182865e+25,3.022314549036573e+25,6.044629098073146e+25,1.2089258196146292e+26,2.4178516392292583e+26,4.835703278458517e+26,9.671406556917033e+26,1.9342813113834067e+27,3.8685626227668134e+27,7.737125245533627e+27,1.5474250491067253e+28,3.0948500982134507e+28,6.189700196426901e+28,1.2379400392853803e+29,2.4758800785707605e+29,4.951760157141521e+29,9.903520314283042e+29,1.9807040628566084e+30,3.961408125713217e+30,7.922816251426434e+30,1.5845632502852868e+31,3.1691265005705735e+31,6.338253001141147e+31,1.2676506002282294e+32]
let oldLevel = 0

function UserCurrentStat({chrCountExp, chrCountDisplay}) {

  const [ lvlUp, setLvlUp ] = useState(false)

  const checkLevel = (currentExp) => {
    for (let i = 0; i < expPerLevel.length; i++) {
      if (currentExp < expPerLevel[i]) {
        return i
      }
    }
  }

  // useEffect(() => {

  // })

  let currentLevel = checkLevel(chrCountExp)
  let percent = ((chrCountExp-expPerLevel[checkLevel(chrCountExp)-1])/(expPerLevel[checkLevel(chrCountExp)]-expPerLevel[checkLevel(chrCountExp)-1]))*100

  const progressStyle = {
    width: `${percent}%`,
  }

  if (oldLevel < currentLevel) {
    console.log('here')
    oldLevel = currentLevel
    setLvlUp(true)
    setTimeout(() => {setLvlUp(false)}, 1000);
  }

  return (
    <div className='stat'>
      <div className='stat__container'>
        <div className='stat__user user'>
          <div className='user__container'>
            <div className='user__info'>
              <div className='user__title'>Novice Typer</div>
              {/* <div className='user__level'>lv.{currentLevel}</div> */}
              <div className='user__level'>
                <div>lv.</div>
                <div className={`user__lvl ${lvlUp ? 'lvlUp' : ''}`}>{currentLevel}</div>
              </div>
            </div>
            <div className='user__expbar expbar'>
              <div className='expbar__bar'></div>
              <div className='expbar__progress' style={progressStyle}></div>
            </div>
          </div>
          <div className='user__count count'>
            <div className='count__title'>Count</div>
            <div className='count__number'>{chrCountDisplay}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCurrentStat;
import './UserCurrentStat.scss'

function UserCurrentStat({chrCountDisplay}) {

  let percent = (750/800)*100

  const progressStyle = {
    width: `${percent}%`,
  }

  return (
    <div className='stat'>
      <div className='stat__container'>
        <div className='stat__user user'>
          <div className='user__container'>
            <div className='user__info'>
              <div className='user__title'>Novice Typer</div>
              <div className='user__level'>lv.25</div>
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
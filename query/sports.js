const matches = require('../data/sports_matches')

//get current time example
const current_time = 4

//send query to database
const pastMatchesQuery = (sport) => {
    const past_matches = matches[sport]
                            .filter(match=>match.end_time!==null)
   
    return past_matches.length===0? 
                           'no past match':
                            past_matches.reduce((result,match)=>{
                                let winner = match.result[0]>match.result[1]?0:1
                                return result += (current_time - match.end_time) + 
                                            'hr ago ' +   
                                            match.rivals[winner] + 
                                            ' defeated ' + 
                                            match.rivals[1-winner] + 
                                            match.result[winner] + '-' +
                                            match.result[1-winner]  + ', '                   
                            },'')


}

const currentMatchesQuery = (sport) => {
    const current_matches = matches[sport]
                                .filter(match=>match.start_time<current_time&&match.end_time===null)
    
    return current_matches.length===0?
                            'no current match':
                            current_matches.reduce((result,match)=>{
                                return result += match.rivals[0] +
                                            ' are currently playing ' +
                                            match.rivals[1] + ', '
                            },'')
}

const nextMatchesQuery = (sport) => {

    //find match with no end_time and start_time passed by
    const next_matches = matches[sport]

                        .filter(match=>match.end_time===null&&match.start_time>current_time)
                        //find the most next match
                        .reduce((next,match)=>{
                            let interval = match.start_time - current_time
                            if(next.min > interval){
                                next.min = interval
                                next.matches = [match]
                            } else if(next.min === interval){
                                next.matches.push(match)
                            }
                        return next
                        },{matches:[], min:1000}).matches   

    return next_matches.length===0?
                        'no next match':
                        next_matches.reduce((result,match)=>{
                            return result += 'Next game is ' +
                                        match.rivals[0] + ' vs ' +
                                        match.rivals[1] + ' in ' +
                                        (match.start_time-current_time) + ' hours'
                        },'')
}

module.exports = {pastMatchesQuery, currentMatchesQuery, nextMatchesQuery}
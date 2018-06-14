const convertPiValues = (value, type) => {
    let final = []
    switch (type) {
        case 'message status':
            if ( value.includes(1) ) final.push('delivered')
            if ( value.includes(2) ) final.push('hold')
            if ( value.includes(3) ) final.push('un-delivered')
            if ( value.includes(4) ) final.push('priority')
            return final.join(' ')
            break
        case 'timed auto type':
            if ( value.includes(1) ) final = 'add message'
            if ( value.includes(2) ) final = 'change status'
            if ( value.includes(3) ) final = 'timed action'
            return final
            break
        case 'days of the week':
            if ( value.includes(1) ) final.push('Sun')
            if ( value.includes(2) ) final.push('Mon')
            if ( value.includes(3) ) final.push('Tues')
            if ( value.includes(4) ) final.push('Wed')
            if ( value.includes(5) ) final.push('Thurs')
            if ( value.includes(6) ) final.push('Fri')
            if ( value.includes(7) ) final.push('Sat')
            return final.join(' ')
            break
        case 'holidays':
            if ( value.includes('H01') ) final.push('NEWYEARS')
            if ( value.includes('H02') ) final.push('MLK')
            if ( value.includes('H03') ) final.push('PRESIDENTS')
            if ( value.includes('H04') ) final.push('PATRIOTS')
            if ( value.includes('H05') ) final.push('MEMORIAL')
            if ( value.includes('H06') ) final.push('INDEPENDENCE')
            if ( value.includes('H07') ) final.push('LABOR')
            if ( value.includes('H08') ) final.push('COLUMBUS')
            if ( value.includes('H09') ) final.push('VETERANS')
            if ( value.includes('H10') ) final.push('THANKSGIVING')
            if ( value.includes('H11') ) final.push('BLACKFRIDAY')
            if ( value.includes('H12') ) final.push('CHRISTMAS')
            if ( value.includes('S1') ) final.push('BOXING')
            // if ( value.includes('S2') ) final.push('SPECIAL DAY 2')
            // if ( value.includes('S3') ) final.push('SPECIAL DAY 3')
            return final.join(' ')
        case 'contacts':
            let {
                NUMBER,
                OVERDIAL,
                PIN,
                EMAIL_ADDY,
                SUBJECT,
                SM_USER,
            } = value
            if (PIN && PIN !== ' ') final.push(`$:{PIN}`)
            if (NUMBER && NUMBER !== ' ') final.push(NUMBER)
            if (SUBJECT && SUBJECT !== ' ') final.push(`$:{SUBJECT}`)
            if (SM_USER && SM_USER !== ' ') final.push(SM_USER)
            if (OVERDIAL && OVERDIAL !== ' ') final.push(OVERDIAL)
            if (EMAIL_ADDY && EMAIL_ADDY !== ' ') final.push(EMAIL_ADDY)
            return final.join(' ')
        default:
            alert(`unexpected type: ${type}`)
    }
}

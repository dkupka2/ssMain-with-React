export default convert = (value, type) => {
    let final
    switch (type) {
        case "message status":
            final = []
            if ( value.includes(1) ) rstring.push("delivered")
            if ( value.includes(2) ) rstring.push("hold")
            if ( value.includes(3) ) rstring.push("un-delivered")
            if ( value.includes(4) ) rstring.push("priority")
            return final.join(" ")
            break
        case "timed auto type":
            if ( value.includes(1) ) final = "add message"
            if ( value.includes(2) ) final = "change status"
            if ( value.includes(3) ) final = "timed action"
            return final
            break
        case "days of the week":
            final = []
            if ( value.includes(1) ) final.push("sunday")
            if ( value.includes(2) ) final.push("monday")
            if ( value.includes(3) ) final.push("tuesday")
            if ( value.includes(4) ) final.push("wednesday")
            if ( value.includes(5) ) final.push("thursday")
            if ( value.includes(6) ) final.push("friday")
            if ( value.includes(7) ) final.push("saturday")
            return final.join(" ")
            break
        case "holidays":
            final = []
            if ( value.includes(H01) ) final.push("NEW YEARS DAY")
            if ( value.includes(H02) ) final.push("MARTIN LUTHER KING DAY")
            if ( value.includes(H03) ) final.push("PRESIDENTS DAY")
            if ( value.includes(H04) ) final.push("PATRIOTS DAY")
            if ( value.includes(H05) ) final.push("MEMORIAL DAY")
            if ( value.includes(H06) ) final.push("INDEPENDENCE DAY")
            if ( value.includes(H07) ) final.push("LABOR DAY")
            if ( value.includes(H08) ) final.push("COLUMBUS DAY")
            if ( value.includes(H09) ) final.push("VETERANS DAY")
            if ( value.includes(H10) ) final.push("THANKSGIVING DAY")
            if ( value.includes(H11) ) final.push("BLACK FRIDAY")
            if ( value.includes(H12) ) final.push("CHRISTMAS DAY")
            if ( value.includes(S1) ) final.push("BOXING DAY")
            if ( value.includes(S2) ) final.push("SPECIAL DAY 2")
            if ( value.includes(S3) ) final.push("SPECIAL DAY 3")
            return final.join(" ")
        case "contacts":
            let { NUMBER, OVERDIAL, PIN, EMAIL_ADDY, SUBJECT, SM_USER } = value
            final = []
            if (NUMBER && NUMBER !== " ") final.push(NUMBER)
            if (OVERDIAL && OVERDIAL !== " ") final.push(OVERDIAL)
            if (PIN && PIN !== " ") final.push(`$:{PIN}`)
            if (EMAIL_ADDY && EMAIL_ADDY !== " ") final.push(EMAIL_ADDY)
            if (SUBJECT && SUBJECT !== " ") final.push(`$:{SUBJECT}`)
            if (SM_USER && SM_USER !== " ") final.push(SM_USER)
            return final.join(" ")
        default:
            alert("unexpected type passed to convertValue switch")
    }
}
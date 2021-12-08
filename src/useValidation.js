export default function Validation(values,flag)
{

    let errors = {}

        if (flag){
            if (!values.query.trim()) {
                errors.query = "ISBN required"
            } else if (!/^\d+$/i.test(values.query)) {
                errors.query = "ISBN must only contain numbers"

            } else if (!(values.query.length === 13)) {
                errors.query = "Should be 13 digits long"
            } else if (!(/^(9)/g.test(values.query))) {
                errors.query = "should start with 9"
            } else {

                let check;
                let str;
                str = values.query.slice(0, 12).toString()
                console.log(str)
                check = Calculate(str)
                if (check != values.query.slice(-1)) {
                    errors.query = "Cannot Verify the CheckSum"
                }


            }
            return errors
        }

        if (!values.title.trim()) {
            errors.title = "Title required"
        }
        if (!values.barcode.trim()) {
            errors.barcode = "Barcode required"
        }

        if (!values.query.trim()) {
            errors.query = "ISBN required"
        } else if (!/^\d+$/i.test(values.query)) {
            errors.query = "ISBN must only contain numbers"

        } else if (!(values.query.length === 13)) {
            errors.query = "Should be 13 digits long"
        } else if (!(/^(9)/g.test(values.query))) {
            errors.query = "should start with 9"
        } else {

            let check;
            let str;
            str = values.query.slice(0, 12).toString()
            check = Calculate(str)
            if (check != values.query.slice(-1)) {
                errors.query = "Cannot Verify the CheckSum"
            }


        }



    return errors
}

function Calculate(messageString){

    var csumTotal = 0;
    let charPos;
    let checksumDigit;
    for( charPos = messageString.length - 1; charPos >= 0; charPos--)
    {
        if( charPos / 2 == parseInt(charPos/2) )
            csumTotal = csumTotal + (parseInt(messageString.substring(charPos,charPos+1)));
        else
            csumTotal = csumTotal + (3 * parseInt(messageString.substring(charPos,charPos+1)));
    }
    var remainder = csumTotal - parseInt(csumTotal/10) * 10;
    if( remainder == 0 )

    checksumDigit = '0';
    else
        checksumDigit = 10 - remainder;
    return checksumDigit

}
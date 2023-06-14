export const useInitials = () => {
    function formattedString(empName:string) {
        if(empName.includes(' ')){
            const firstLetter:string = empName.charAt(0).toUpperCase()
            const index:number =  empName.indexOf(' ')
            const secondLetter:string = empName.charAt(index+1).toUpperCase()
            return firstLetter+secondLetter
        }
        else{
            return empName.charAt(0).toUpperCase();
        }
    }
    return { formattedString }
}

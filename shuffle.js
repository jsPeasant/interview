function shuffle(arr) {
    const len = arr.length
    let j = len-1
    while(j>=0) {
        const randomIndex = Math.floor(Math.random() * (j+1));
        [arr[j], arr[randomIndex]] = [arr[randomIndex], arr[j]]
        j--
    }

    console.log('arr', arr)
}

shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,15])


function shuffleBinary(arr) {
    const len = arr.length
    const newArr = new Array(len)
    let k = 0

    function shuffle(i, j) {
        if(i <= j) {
            const index = i+ Math.floor(Math.random() * (j - i+1));
            newArr[k] = arr[index]
            k++

            shuffle(i, index-1)
            shuffle(index+1, j)
        }
    }


    shuffle(0, len-1)

    console.log('newArr', newArr)
}


shuffleBinary([1,2,3,4,5,6,7,8,9,10,11,12,13,15])


let count = 0
let global = 0
const dataLoad = async () => {
  const fetchTabData = await fetch(' https://openapi.programming-hero.com/api/videos/categories')
  const resTab = await fetchTabData.json()
  const data = resTab.data
  displayData(data)
}

const displayData = (data) => {
  //console.log(data)
  const tabContainer = document.getElementById('tab-container')
  data.forEach((element) => {

    const div = document.createElement('div')
    div.innerHTML = `<div class="mx-auto w-[40%] md:w-[80%] flex justify-center tabs tabs-boxed text-lg text-[#252525B3" onclick="cardLoad('${element.category_id}')">
        <a class="tab ">${element.category}</a>  
      </div>`
    tabContainer.appendChild(div)
  });

}
const cardLoad = async (element) => {
  const fetchCardData = await fetch(`https://openapi.programming-hero.com/api/videos/category/${element}`)
  const resCard = await fetchCardData.json()
  const cardData = resCard.data
  global = cardData
  displayCard(global)
}

const displayCard = (cardData) => {

  const cardContainer = document.getElementById('cardContainer')
  cardContainer.innerText = ''
  if (cardData.length>0) {
    cardContainer.classList.add('grid')
    cardData.forEach((data) => {
      const id = `count-${count++}`
      const div = document.createElement('div')
      div.innerHTML = `<div class="card w-72 h-80 bg-base-100 relative mx-auto">
            <figure class="rounded"><img src="${data.thumbnail}" alt="Shoes" class="w-full h-52" /></figure>
            <div class='absolute text-white bottom-[45%] right-[5%] bg-black rounded px-1 py-1' id='${id}'></div>
            
            <div class="card-body px-0 mt-3 pt-0 ">
            <div class="flex gap-2">
            <div >
            <img src="${data.authors[0].profile_picture}" class="rounded-full w-8 h-8" alt="Shoes"  />
            </div>
            
            <div>
            <p class="text-base text-black font-bold">${data.title}</p>
            <div class="mt-2 text-sm text-[#111111B3]">
            <span>${data.authors[0].profile_name}</span>${data.authors[0].verified ? `<span class="badge align-middle px-0">
            <svg width="20" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_13_1000)">
              <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
              <path d="M12.7093 7.20637L9.14053 10.7751L7.29053 8.92668C6.88897 8.52512 6.2374 8.52512 5.83584 8.92668C5.43428 9.32824 5.43428 9.97981 5.83584 10.3814L8.43115 12.9767C8.82178 13.3673 9.45615 13.3673 9.84678 12.9767L14.1624 8.66106C14.564 8.25949 14.564 7.60793 14.1624 7.20637C13.7608 6.80481 13.1108 6.80481 12.7093 7.20637Z" fill="#FFFCEE"/>
            </g>
            <defs>
              <clipPath id="clip0_13_1000">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </span>`: ''}</div>
            <p class="mb-3 mt-1 text-sm text-[#111111B3]">${data.others.views} views</P>
            </div>
            </div>
            </div>
          </div>`

      cardContainer.appendChild(div)
      data.others.posted_date ? displayHourTime(data.others.posted_date, id) : ''

    })
  }
  else {
    const errorDiv = document.createElement('div')
    errorDiv.innerHTML = `<div class="flex justify-center items-center">
        <img src="./Icon.png" alt="">
        </div>
        <p class='text-center text-black text-2xl font-bold my-3'>Oops!! Sorry, There is no content here</p>`

    cardContainer.classList.remove('grid')
    cardContainer.appendChild(errorDiv)
  }

}

const displayHourTime = (timeText, id) => {
  
  const numTime = parseInt(timeText)
  const hour = parseInt(numTime / 3600)
  const minuteConvert = numTime % 3600
  const minute = parseInt(minuteConvert / 60)

  const timeDiv = document.createElement('div')
  timeDiv.innerHTML = `${hour}hours ${minute} mins ago`

  document.getElementById(`${id}`).appendChild(timeDiv)

}


const sortBtn = () => {
  global.sort((a, b) => {
    const firstItem = parseFloat(a.others.views.slice(0, a.others.views.length - 1))
    const secondItem = parseFloat(b.others.views.slice(0, b.others.views.length - 1))
    return secondItem-firstItem
  })
  displayCard(global)
}
dataLoad()
cardLoad('1000')

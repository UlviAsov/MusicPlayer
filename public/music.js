class Music{
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}


const musicList = [
    new Music("How You Remind Me", "Nickelback", "rock.jpg", "1.mp3"),
    new Music("Uzaqlara", "Elşad Xose", "rap.jpg", "2.mp3"),
    new Music("Uzun Lafın Kısası", "Bahadır Tatlıöz", "pop.jpg", "3.mp3")
];
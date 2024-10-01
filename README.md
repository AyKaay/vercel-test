Vite React project folders directory tree

Auction
├─── node_modules // nodejs module library, framework, ...
├─── public 
├─── src
│    ├─── assets    // folder gambar static untuk website
│    ├─── routers   // folder untuk routing page ke page
│    ├─── views     // folder template per page                     
...  ...

workflow developement feature masing-masing:
    1. Develop feature di branch masing-masing
    2. Git pull dari `development` untuk update repo terbaru
    3. Merge request ke `development` kalau sudah selesai

                                              ┌── Branch Dayat
                           «──Merge request   ├── Branch Ilma
Master «── Development «──────────────────────┼── Branch Farid
                                              ├── Branch Hamdika
                                              └── Branch Farrel

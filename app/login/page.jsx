"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  loginUser,
  getUserDetails,
  Update_course_detail,
} from "../api/umsinfo";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

function Login() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Login, setLogin] = useState(false);
  const {
    setRegistrationNumber,
    setPass,
    setCook,
    setName,
    setdp,
    name,
    setThemetop,
    setThemedown,
    setId,
  } = useUserStore();
  const [avatar, setavatar] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUXGB0aGBgYGB0aGhgZFxgYGhgdHR0YHSggGBolGxgXITEhJSkrLi4uGh8zODMtNygtLisBCgoKDg0OGhAQGi0dHR8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLf/AABEIAQMAwgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCAQj/xABDEAABAwIDBQYEAwUFCAMAAAABAAIRAyEEMUEFElFhcQYTIoGRoTKxwfAHQtEUUmLh8RUjcpKiFiQzQ1OCstJzk7P/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAjEQEBAAICAgICAwEAAAAAAAAAAQIRAzEhQRIyUZFCYYEi/9oADAMBAAIRAxEAPwDDUITjBYR1R0NEoBuhWSp2WruAimQTlwKhsds2rSP95Tc3mRb1UzPG9VVwyncNEIQqSEIQgBCEIAQhCAEIQgBCEIAQhdMaSYCAnuxOxf2nEtaRLG3d62C+ktn4QUqYaBEBZ9+E3Z/u6XeOF3XPTRaLi60Bc0vyyuX6dOvjjMf2jca+TYrGPxmj9uZxNBk8M3AfJbA928cvMH5rIPxig4weK4pMEEGcpsdc1pj2jP6qChCFqxCEIQHoC0/sNsAUqTa9QS512g6Dj7W6rPthYTvcRSpj8z2j3W3YloB3Rk2w8rLDmvWLfhneQqu3psuH4NrhDmyDYzB9jmuWnRSVGmCB0ny4rG4RvMqzXtH2EPifhxcCSzQ8d3geSoVWmWktcIIMEHQr6FxFAQDJtcGY9BwVD7c9mu+acRSA7xk74H526EfxfoeCvj5bjdZdM+TimU3j2zNCELqcoQhCAEIQgBCEIAQhCAFZOymye8qtnU+2pTbZmyhuio/LQcVpH4dbM3i6qRYmB0H6keyw5c/Go34uPzutH2LhhTpgC1ktiHTquwbQAkag6+SnGaml3zdmzqG8Rl5FYl+K7Zx1U3kbou2LBoFnDPzW6U6YJCyf8SdkvdVqvNSpulx8IpuInTSPPznNaY9oz6ZYheubBIXdKiXXAtqTYDzK1YE0Jbum/wDUb6O/9UICY7CidoYb/wCQfVbFX+Jx+/6LHewjZ2hho/6g+RWwPMucufl+zp4frTZjr3UxhWEjgD0tGXJRdGkN6YmNFK08Qf3egGf8lG2lh3UpCLCeef0UNtGgWO3mzvaiAZyOQ6BSprVHZy31nyAyXmIowLAnobj0m6nKbOXTG+3fZ8UnftFMf3b3eIAWY4iT0BP6KnrcNp4RpZUp1Gk03iHgi4i4I6ZrKu0fZ5+Fd+8wnwu4iPnM25LXh5P41hzcev8AqIRCELoYBCUbRccgUocG+J3THyRs9G6E7Zs+oYhpU9sTsw57gKgLW8dbcPVTcpDmFqs0qLnGGgkqxbP7LP8AjrQ1o/Lqf0V4wmz6NGe7aCTedb81FbUxBMnL9fsLK8tvTacUnaMxQ3nNY3WAB8gtd7NYNtNm4PygN9Bf3JWW7BcBiA5wmxjk7RaNspwaQZzvHHPP09ljfs1x6Wtp0gQuSOS8ov3ha/31SrmLSJNy/hKyb8TcPiTiam735ZYtgSwS0SBAn/NZbAGW08liX4k9oXuxFRrC4NaSz4AAYtm65FtI+SrHtGfSiPDWE73jfw/KOpHxHpbqkatYuzPTgOgFguXum65W7nCEIQE92GxG5jsOYBl4H+ay2ANuepWDYWuab2vbm1wcOoMreMJiRVYys0+Go0OHnmPIyPJc/NPMrp4L4seCQfv1vkl6eP8A3m73z6ki4TPHM1Gq8wbn5kucNAB8pg+YWUb6T2GxbRENjqTr805/ad624I0uVGYaqR/ygNb/AHmnrK7z+QNHXPpBTTpG7apgnMg8nSPSFVcQab2nD153CSWuNiCfCD8zpborjjWeEl1vcemaoe15mNZ8LmzBiNNDZTrZ+lexvZIsPxAic8geh1SeD7NCfGYvofT5qzMrhwdTcJBNuUQba5kHyKi8S1zTDSXDMA+sc7ELWZ5dVjcMe0hg6FFg3Q0TFydSPrKVfWYB8IHGwXVF/esvZ8WOVpn1sQu8I40wG12jdfIac9b/AH1U2LlNjiKe64honSND+iSdi9ZIzXmJ/ugWGHg3Dv4TkZ6yF7sLCb7XCqJ3XQ7kLunpFk5iVyd0K/iaN7d3tSNJvKMbu0nND4M68jy9fVJYrZrm7k3bIDXSBb+VuqU2pgy+ncS5ozHHn5QnotlP2DVkgnIi7SIN50Jv6KY7P940k7p3b719CBlwmx9VB9ncS4A+IDloNQY1nxdFYsDvtJIFnuBd1F89bR6eisOVeNmnw70zN/a0eS93nE3J6D7/AEUdSxpawHdJkf8ArHspTB4hpvySii5eI3XWlYf+KXZ00cS+sGf3TwHb8wN423Y4yJW3U2bwk/Y+/mortbs9tfC1WHNo322BhzZIz9E8LqlnJZp83jCwJedwG4GbiOTeHMwF53zB8NMHm4kn2geUFd46gWuMySPicdXHrl531OcBoupxl/2p3Bn/ANbP/VCQQgPQFq/4V4w1MM+g7/lu3m82uzHk7/yWUAq7fhhjDTrvImN24jMSJ9pWXN9K24LrONExTd0wUkKjRdznEDIC3yKkdoNa8S0zwUVUw7osPW3zGa5Zdu6w6obYbMMpuMZkyfLNOWbUJBO6ARqbfzUQynTpgmo4cTJm3IDSeOaZP2wxjoFKRoHfMNFmN91emVTWJx7jYHy09CFX6zA+oAQGn94ZWuZHPK3HJPBtgVJG5u+5J5CbJ9R2aH23iD0ER6pa0as4zBODi5sOaQLgk2aZzzHTXmksPgy4G0EEznciDrxaCfNW0bNaxvxDfE3i8Z85ymLzzTV8EA0xDrZXaSLRMmJANjw8k5WdiJwFMBlOo6AGm4OYEktP+oeyUxrTiKbnEwA7wA2sJy52PqnVGkN0CqIbADm8y6I9vkucQGd22DMzEcCBEA8ifQqiV3ZW9XeWm7GuaL6XJAP3mp/Z1ADEv3ZDTLXSf4Zj03vRNtlMaKjt0Q3f0v8ADzOfxNPqpp2zPGTSIneaSMrgmfKCDyAKdqZCOOwZ7tzB/wAMtgE6FoBvwUVh2VqbQ8maboDxneYPTL3V4wTBVD6ZzteIM55cRZR2M2ORTqtFt4yQMv4hy1uls0W3YAG7Vpt3ajpcWzY+KSOE5dT7OMBjATbKwaY1ByI0uDfmOKNsY11GrQDfhdaDxAgeXwnyUjW2duguYJLgSR/FnI4WPHQICRwlZrqdOR4iQfIHLnn7KQNAZjgbffQeirmx8e17WtdYhoP+ZzgfQAnzVhYSzdcLhzv/ACkk/NI5TrCuc0NB1F+QAC42k8Ck8mfhyBixzvFv0XTMW0g5Ax7aSkqjDuOMfWYHysnAw3tzgS2CG/ES6NGjkOepPDoBTFq/bzBOcTM1C3xQBFOYF3F1jEi036CFldYGTJk8ePNdGN8OfOarhCEKkBWXsHVAxTAS6DIibXEGVWlaewmE3q28AbcrKOT61fH9o1bZWGmodN3P78lztbFEEjK1uXROdn1h4gbF4BHMjMKB2nUdvTnE2m4n+gXn4+a9K1BbUrEwGiZdfyy881IUNluqBrmzvR4uJtA9LDy6Io0Gvd1zEZ9OaseH2aWNG68N4TJadcxdp4308l0bZVX6eynNduvaQZzIO6eEkXHUKx4euWtDXjSxmfcZ+ye/tL2iHtHqDfQjIEeh65qImXh2nDNvCym0iWKfvVLTf/TEwfT1zSNBrmiWgfEdTdpIJvxEe6ciAZaZAsRqOB/0kfYSIMMc0CHAHPQi4B4yDnwShV7tBhqsAkNqRY2DXAODhvDQiJkaTPFM8BhW7hBG45gLCDY7zQLDru5aXXTXuqFsCLW4sMgkeLMZxxBITmvS7ykARLwC2QT4iwWE5teIsTeBB0ItFhrsmmA4HQvf08QaRPKx+ynO06VdjjWpXaIJGegHodenNVfZOONKq6m6YJkdW5erSR1IWlbKG9Sbad8f1+h9UXwU8l9j1BVDcRTiS0b7eP8AMX8jyTzaGHkOaPzAweBi1teC72Ts5tMb7LB1yNJgTbRPKouDofmgKNtnAuqPokG7QCDnM5Z3mR7wVO0Q4WfGQ6azH3wUs7BtM2SVXCX4g3HKc/vmg2Y7Yw78PVAYTLi3d4Dd3rDj8Q+qv4r/AO7U3QYseZJgN5kmfdR3aTZDqpbuiTMTwlpv9PRS+Mwh7unTAggCCPy2gkc4JHKQdEbCHp4wh5bnoI4jO/AEx68FOYPEb0hx8vTQZDkoathqVEy4tpgTm6LHr9PVLYPF0qkbjjnYddEHs07cbPY6kXxvHyN+IbkT1WEbUpgPPxSf3jJ9V9IvuC0tmbXbA+Vwsk7e9mBTcXtHhcTcjI5mLrTC6rLPHcZ4hKFo4/fovVuwc0xJAiVq/YDYfdjvIgG2cyqz2M7NCq9rn5ZwBJHmAQPZa/Rw7WNa0CAPL5Ll5uT1HVw8fuq3tM1GE7gbYyJMQq5jtpPneyvcK17fEE5eap9XY76hmzWyseOT21zt9JfYOIDiPCTOZGY8hF+YVw74CnM7w6fpqqnsHY7aZ8Tw4cwZ9QbJ7jsQGnwVNbzJ9TefOVd/op/aQFzvAkAa8ud14RBMZe08OWiaUcQACXEyRxt6rqi3SSbZcP1ClRzhS0yY0vN4++PFRVbGRUghsGxEzIGWV7aHopZhgEsJkZ8D0i6iK9JxLvCRPnbyj9U4VN6uIG7vA7pBPGbfPP7yTrAYowIO8SReDnwPLgVH/wBlTYvtra3L4okcwCpPZ+z9wbpfI0Bi3KTp5dQrZojtTgS5zKzGyd4bw5t/pHUKe7DbQPdd0TvFuR4A/D7RbmpKph5EEcJn7ySeztltpxuzG8T65D39glvxoa9rdg6wi3Xz1S9VkiOKh8JVhSdGt+sI2NPcPUixT+nSBsmT2jeBHXqFIYFPEqRp4a7tZy5R9+6qv4j9qG4GmAwB1eoIYD+UAXcRw+ZKvjqd5Xzd2+2sa+OrvMkNeabBwbTO77mT5q9J2af2n3797ES8k5k5dBl8ld+yOzhTJc1xiJjK3GPv5xntOl4W1AcvFHR5b9J8wtZ2a9vdU6n7sb3NjxDh5qssdwY5aqbxtTdZvy+BeRp1VS7SOZicLUid9gkB1i6ON7cVY+x20e8bUpuuaTyyeO6SAfZc9oNngkls+JpFunL9FlPDTKenzpVpgEiTYnReKYxWzXb7ru+I/mjXhohdO3L8W3bD2O2g3dAhP6g9lJmgmtaivPr0JVX25d98oCi6h4mw+9FL7doeKeSjaNOSBBHTTzTia9wcDxOtwkxfT7gppiq/jIgsnQXB8yZKkcRUixHq0x52BKjjSAmG36RblAsriaWbUuCXQ45QPGfKYTkHUN/7iDJPQSAkaVEt+KxP7onrJAnqursBIh0Z3gC2pMoCQgkSGtLuY+tklUHdy5wbxd4sgOZN/KAkcNiiTlB9us8eV1F7Yrur1G4cS1hNzxAkm6J2Kgdt9qHFzu6iD+Yixj90G8KuDaNaZFWoDycR7Cyk9t0BvnQD4QNGjJRuD8dRtOPicGyTESQJ910zGSOe3dTGyO0+Jpm7jVHA5+S0jYG2mV2S02+XXmsvfg9ypuk8fVpIIUth6xwtZtQfA/4xz4qMsZ2rHLzpqlMwJ5p1Qf7KN2fiBUYCNQnVMrOxolA7KFI4F2ShKNaIUrhKkFOFU2V8udpMOW4muxwgitUz/wAZ/kvqBjpasf8AxF2VRGJe57XDfh0tuMhMjrK1ZeWUtrO+Aa2jz9lpdTabaOEYCc90n/C2/qVW6VTDUnS1pqO0lqlNl9na2LeKmIHd0RcM1I58AncpDktWP8OGvFCpVfM1HF3Wf5qb2hjJDnGQGU3Exc9AIMG3BNcRimtaKNIwMhGVhllcdF03Zu9RqQ4Ad3EgQNTYZf0WMaVjFWkS4ner3JOgzPDeshK4nZGFL3E1nE7xv3jL3z1Quhg+jHJCqEs4pCoVx11xB7bpzGihAADN55f0Vk2jTDh+igXgCeOXH5KTRuMd4ueYvB6ZZJHv3NItEHK10riaUmSR6JriKzWut0vPmriae4nE+AuLQQBpHtvclXcd2mYIaymS7hoD5D6Lrau0S47rZAyM6+oTLA4ADxG5nrHmFUk9ot/CZ7O0K1UyfCDfdBueP0UhtygMO+jV/LMOPCRH1nySOz8T3ZADhHkBz8U35fVT7mtxNI03tdBGeY9YE+SXvavWmY9pmObUINxeCOBuoFri0hwsQZHldXbaeDfhz3eIpuqUvy1GiSBwPkoj9gwpuK1uGq6JZY57LDPZxqVntkze3nc9VN9pHgNDR+WB7foB6rhuPoURFL4v3v0GqYupVKxs07ov15lK1WEtu1w7BbSJHdu4eHors1ZfsJjmva5sjdsfdabRqyG8x9Fk2KypDA17XzCjyUtg2wb5GQgLLgMRooHtVsTvaralzDbt0s6R6iR5KQwL4UtmAVevlNI38btTqGxqDRvsptB5BRm2MbHgbYn7srzi8IHDJQ3+zty5pufvio+Nh/KVXNnUiXB0ECIyF9DAvrzT/blTuqFTcIa0MJedXE2Avl6qbZs7dzN9P0sMlnf4p7YbQpig153iZcRFjoOA+eoyTxx8lcmaVcVUk+F2ZyiPK2S9VffUkk8Trc+uqF0ac/yfV1RyQqlLOCb1SuF2kKjLFQOKbE5fRTr3WuofGNzCmqiCxWIgE6fcZqArMNQkg9TNieGSmcfhDMHJc4XZQzub6WstJUWIc4LWNE+w9AbvMafYClHUg0W3gOXz4LxmFBEm83vyT2WkJiKBuW+VsvMrnC7ScDLDvEZl0EzPt6eaXxOHIBs7hGdp4JKgxsEEE3mYiBFpI1TiU9gu0JeN14Djyj0zgHNOBhcLUN6VOTyB9LZqssY0HebNjctEHSxH8lI0t6RvAy60QWm+UZcb6o0Np+lsPDtPhpsb0aE6p7OYBAAE8uKa7Jw7/wBN7hnkNVPtowIzQe0Ng9kNa5xAzT0MAd9/eifbkBNXnVMbdBKNfzTYu+/vqve+CStJjBVwpvDvnLJU3D1jMqe2fjPp6KsaWWFTD2rqkV6IIldU2rRgTx1qbiIkBfK3b7FVKmKeaji4yYvLY5eIx7L6d7R1CMNVjPdIHU9AfkvmTF9nqpqPc+niXmbl1Pum/wCeqcv+1VinLpV0Kwf2WBbuqfnjKM+fizXivaNPo7fSNQrhz5SPexZcDuIVnGU1rjWyc1EzJSOGdeg03MpbDObG6bQvSyU1q0z05ogrvFiBbyn+eaSLxAm3EnXkujVMQbpg5m8crcL397qomu6xaToDyv8A0TKth6RIAkHiCOGs2SpwribSOhgD0tyR/Z3KR6Kkmb8QymWts6MgAOsyE/wWHc8z4gDpPsb2HRLYXZzBoPmpGk0yI9rI2NJTZ1CBwUiE1oWCWNRAd1Cm5YbpTeXLzxTBrUEAlRVXFC99VKY6lvsLcpGeqolbZ9ek9ziC6dZzQ149b8rRSxtk9wWOMgSqdsjaT3OLKjN2Mrz9FZ9itBL+I+sT81N278ccfjavmzq8gKSmyjNnMhoT8vW86eRyWXK6c1MjNxGS+a+1+0MLUxdRrS6m0EjdqUQYcDeHbxc3puxyX0g6pAJJAjise7YbQbi67hh6mFrkW7jENkk6mk+xMjRpnoqjOswOHbpi8PGkseDHTubIU2/D0ASDs6iCDB/36LjOxfI6FCvaNNmw+IDhIMryqFSNn499M2yMAg+Rtw1urZs3aDKoBBvqDmPuVxWOyFe+4pKqUtiKXDNN25wVJknPXRpbwXrqaTbVg3QCXc7vPqvQwEWhPi0FJmgBdUVR7mRp+nogv5JzVamTwZ+ipLwOhSOFcFHWmDfkPqck4o1d02++pP0QE1v8l1TcY+FMaNcHM/z/AJcyn7a9rIMQZuLJMk5lcYis4jLWw4pKrvW++qZFO9gro7r89UwqRKWwuaY2Qx/Z8FwqMzGY4hcdn6J712gDr+Snd9wEnJRezmu7xxjMp6aTly+Olvw9eydd8oZtYNEuMDmoPb3bWjRDg07zgJ6AZnnAuRwlXHNU52l2tTo0XCo5o3rDeMAu0BP5ZvwWF7f7OMr79bCTvgzVoO+NhN8uB0iWnIH4Q6xbbx5xdPvBFQgOBYTaqwXqUjGVQbpe10SCzSQFRv2+phXsLHOfSjeovnde1psQHCd0gy1zDLZBsQQVciMqZN7Q4sCBisQALR3r7f6kKwu7T4d3idQwrnG5LsId4k5k7tYCSc4AC9Vf4n/U7Srgm+ogHmnODqOa7ea4gg5cfRRdInMO4H7Hon2HvBJkrlrqi9bIxoqtnXUc0riMPqM1U9mYnceCD1+qu2EqB7QQosVsxF0i+in2Jw5FwvAAQkaOEhOGvlLVKCRqU4Fk4Tl6a1KU52HL7unDW8UsGTc2TJEPoE2Atw/Urprd3mfYfqVLmiDbRKUtngppQ1Kk6ZuSTbiSpX9pAEaj3KfUtnRfU2HIa/p6rpux1WhtHMqnPjAHnmfQe4XoBdOg08svr6FS1TZJyGgt52+XyQNmubEZD9L+6NFtDtwNhPX9EoKzGG1yu9o0qnICPv75plh8NJiRIz9UwdbzqkcAZhS+EwgaPqo8YulSEvcB/SVVu1/bkBpp0Tc5O4EGCHcPFAPJ86FVJsrk5/EjtKynu02wRNzP6ed9PY5TWxpFZriSd0EOnM/ESDodOS9xmPdXMvPheYI/6b9OgMfPPdlRTnG8/EJBn09QtpNMMrtNbK2t3FUscT3e9uv4jd+F7f4muG8Oqktu7NAqGiANyv8A3lCMm14G8xpn4Klo5OonRVPFOl29xAPnF/eVZdl1v2rBPw5k1qA72kbyWNzA5iYA1lv7qL+RPwqiFY/7UwLvFVwz3VHXe4PIBebuIANgTNkJ7LSxkQZ9dcvqndC2gk8PuNUm9pBkzBFzHXPqvWxAufPL+Vlyuo/oCSCM87e6sOw8WWOAvBN506Ks0AAQQYAvH3cZKSw1edevLpyUqaGaUhR9WhunkvOz2OloBM+al8RQkIuJbRRASdSlIS3dkSEAqTNO6HVDqRTx7LpSmwEplslRoyE7oUpSjaVk6pUrK5E2hjE5axJtGicsariKGszXrwAJSjFHbcqObRfuEB0HdnKYMTGiomZ9u+0Lm1mgS0B4AIu10kRMXHDr7VP/AGuc3vXnMsMQeNSoLcD4QU07TYup37A4FkuAcx12zI+F0XHWFVKrjuN5g+zqh+quRFqVxfaV9R7bmA5pz4QP/EQompVLSCTMOcD/ABDX1DiPNNAu6rrnqq0nZdzw151Y4eoNwf8AED7ghJ4u7pkEm5jjqfM380ghMnsp1snHuoVmVmZsMxoRk5p5EEjzTRCAttXsXUqONSi6mKTyXU950O3HXZIix3SEKrjEPFg93qUJeT3GqCoNw7zibWjLUa9T0SVXCxPAE8xxEHounM16QMpzJ66+ZStJxOZAtPLIrldZOo0wIImMvKfSyUo1HWNjpCTczU2+/VeU6Yd+YNJNx0zi2fJATuBxLmkaQbR955q6bP2q0gSVntGuJhsCOOf8vu6SdtJ9Jzm3IzkaTpwt9UQq1HEUgbhMKjCHEpj2d2414DHGTkD9/JWGrRBBSuI2YRZd0mwvX048l1TckDjDtT1l02oDNOqbVpEV2ymlQENXsqomgGyp/bfGu3QxjgCHNnPIyCDu3FtbdVY9p4wUqZcdPmcli/a3HVH99UpvN2Mc2+RmmHRHiY6CfuUyVDae331HBtZgJBBE3cL2IcMx6Z5lVreOU2T3bFcuql2W94xaPj8WlpBMTyTBaxnQhCEyCEIQAhCEAIQhAa1hWksk3Gk6ZzmNV5tBkQ4A7pyHAmL9ITykd8CTDgPY8kq5o3ZABHE9Pf8AkuN2I2rIJvoADp92XgA4851PFdYp8gmPIchHqm7HA2mTOiYPN47wcG5ZiLeqb7TxAneIgZXBibEeXNPGlpFotbIxwJ538kz2gxoaQZg5WsiCuMBiHNAcw3DoN8iDfnxWtbCxZqUWudnCxWlWDRvN3ho7gSc756LROw20GBu4XScx0AHPnpbNWhdn0ZTWrQ4KSoGUVqWqm4iUwoGD96p7Rcke7ulmNuiFTposh4XDTZeuctEK920xQZh3G/8AS+iw/bmIY4jcyfSqsgXBLN6o2w1ksjXktQ/EXbBpkMyHEQf9JziJ4rG8diGh5fuj+7qNqANNi0wHxPMUxBuFUKoNx3mTmWWP+FxkHycT/mCbJ1Ub3VV7cwC5p5iYP6jnCb1GQY9DxGi0ZuUIQgBCEIAQhCAEIQgNrLfE3nIPRJMaJjThohC4naTNFpIkTOfumj6LQ4gCANEIRA7otv5/ol/3hmJ16ShCokKymLmBqOok58VYOzjQMUAMhA8oB+a8QqQ1jAlP6mSEKvSb2bkXXUWQhKB6UOyQhUlk/wCK9UtuDmCDqCLWINiOqyQn+8LdDSdI0/4ZeOniaDHJCFePScuzTaR8Y/wU/wD8mJA/D5oQrQ4QhCAEIQgBCEICxYXDsLGktHwjTkhCFKn/2Q=="
  );

  const [Loadingg, setLoadingg] = useState(false);
  const [ImageLoad, setImageLoad] = useState(true);
  const changeanime = async (e) => {
    e.preventDefault();
    setLoadingg(true);
    setImageLoad(false);

    try {
      const response = await fetch("https://nekos.life/api/v2/img/neko");
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      setavatar(data.url);

      setLoadingg(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoadingg(false);
    }
  };

  const Loadhandler = () => {
    setImageLoad(true);
  };

  useEffect(() => {
    console.log("Avatar updated:", avatar);
    setavatar(avatar);
  }, [avatar]);
  const handleLogin = async (e) => {
    e.preventDefault();
    let loginData;
    try {
      setloading(true);
      if (Login) {
        loginData = await loginUser(username, password, avatar); // Send avatar if isLogin is true
        console.log("Login successful with avatar:", loginData);
      } else {
        loginData = await loginUser(username, password); // Send only username and password if isLogin is
        console.log("Login successful without avatar:", loginData);
      }
      const cookie = loginData.cookie;
      const token = loginData.token;
      localStorage.setItem("token", token);
      // Store the cookie in the browser
      Cookies.set("session", cookie, { path: "/" });
      const meow = await getUserDetails(username, password, cookie);
      const course = await Update_course_detail(username, password, cookie);
      await fetch("/api/exams/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reg_no: username, password, cookie }),
      });

      setName(meow.user.name);
      // console.log(meow.user.name);
      // console.log("Login successful and cookie stored:", cookie);

      // console.log("Login Data:", loginData); // Debugging step
      setId(meow.user._id);
      setRegistrationNumber(username);
      setPass(password);
      setCook(cookie);
      setdp(meow.user.profile_image);
      setThemetop(meow.user.themetop);
      setThemedown(meow.user.themedown);

      toast.success("Login Successful");
      console.log(name);
      router.push("/"); // Redirect to home page after successful login
    } catch (error) {
      toast.error("Login failed");
      console.log("Login Error:", error);
    } finally {
      setloading(false);
    }
    // Handle login logic here, such as API calls
    console.log("Username:", username);
    console.log("Password:", password);
  };
  const handleToggle = () => {
    setLogin((prevState) => !prevState); // Toggle the state
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {Login ? (
        <div className="avatar flex items-center mb-10 ">
          <div className="w-28 rounded-xl">
            {/* <label>Avatar</label> */}
            <img src={avatar} onLoad={Loadhandler} />
          </div>

          <button
            className="btn btn-ghost ml-7 text-gray-800 border-2 border-gray-300"
            onClick={changeanime}
            disabled={Loadingg}
          >
            {!Loadingg && ImageLoad ? (
              "Change"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="form-control w-52 mb-4">
        <label className="label cursor-pointer">
          <span className="label-text font-semibold text-2xl">
            {Login ? "Register" : "Login"}
          </span>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={Login}
            onChange={handleToggle} // Handle the toggle event
          />
        </label>
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {Login ? "Register" : "Login"} to Lpu profile
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Registeration number
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            UMS Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-white "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="loading loading-infinity loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;

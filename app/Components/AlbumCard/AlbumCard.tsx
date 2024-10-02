import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./AlbumCard.module.scss";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Button } from "../Buttons/Buttons";
import NewSongModal from "../NewSongModal/NewSongModal";

const AlbumCard = ({
  item
}: {
  item: any;
  className?: string;
  name: string;
}) => {
  const [album, setAlbum] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [addPop, setAddPop] = useState(false);
  const [currentAlbumId, setCurrentAlbumId] = useState<number | null>(null);
  const addPopRef = useRef<HTMLDivElement>(null);

  const toggleAddPop = (albumId: number) => {
    setCurrentAlbumId(albumId);
    setAddPop(!addPop);
  };

  const clickOnPop = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const closeAddPop = () => {
    setAddPop(false);
  };

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.get(`http://10.10.50.154:3000/albums/${id}`, {
          headers: {
            "Content-Type": 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNzM1MjkyN30.Z174f2qBn0P4m9606SJMDQuvBYMxuDKbeMNi6YMsgoo'
          }
        });
        setAlbum(response.data);
      } catch (error) {
        alert("Error fetching album data");
      }
    };

    if (id) {
      fetchAlbumData();
    }
  }, [id]);

  return (
    <div className={styles.albumCard}>
      <Image className={styles.albumImg} src={item.albumImg} alt={item.title} width={150} height={146} />
      <div className={styles.albumName}>
        <span className={styles.albumTitle}>{item.title}</span>
        <span className={styles.artistName}>{item.subTitle}</span>
      </div>
      <div className={styles.hoverbtn}>
        <Button bg={"blue"} title={"+ Add New Song"} onClick={() => toggleAddPop(item.id)} size={"big"} />
      </div>

      {addPop && (
        <div className={styles.popBackground} onClick={closeAddPop}>
          <div ref={addPopRef} onClick={clickOnPop} className={styles.popContainer}>
            <NewSongModal onClose={closeAddPop} refreshSongs={() => { }} albumId={currentAlbumId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;

import { useEffect, useMemo, useRef, useState } from "react";
import './App.css';

interface Marker {
  x: number;
  y: number;
  title: string;
  description: string;
}

interface Position {
  left: number;
  top: number;
  title: string;
  description: string;
}

function App() {
  const originalWidth = 641;
  const originalHeight = 760;
  const markers: Marker[] = useMemo(() => [
    { x: 307, y: 573, title: "Salem, MA - Witch Trials ", description: "Famous for the 1692 witch trials. Nineeen people were executed by hanging, one was tortured to death, and at least five died in jail. " },
    { x: 270, y: 670, title: "Fall River, MA - The Lizzie Borden Case ", description: "The Lizzie Borden case is a famous true crime story from 1892 in Fall River, Massachusetts, where Lizzie Borden was tried and acquitted for the axe murders of her father and stepmother. The trial became an important piece of both folklore and popular culture" },
    { x: 290, y: 600, title: "Boston, MA - Captain Kidd Arrested ", description: "Captain William Kidd was a 'legal' pirate, basically a mercenary hired by a government to attack and to loot the ships and colonies of rival nations." },
    { x: 200, y: 718, title: "New London, CT - The traitor of the Revolution ", description: "Benedict Arnold joined the revolutionary forces at the beginning of the Revolutionary War and was trusted by George Washington. He eventually switched loyalty to the British. He ended up leading the British to attack Groton and New London, CT in 1781. " },
    { x: 150, y: 600, title: "Hadley, MA - The 'Angel' who saved Hadley ", description: "William Goffe, a former English military leader and regicide, fled to New England after helping to execute King Charles I. While hiding in Hadley, Massachusetts during King Philip’s War, legend says Goffe appeared during a Native American attack, rallied the townspeople to victory, and vanished—earning him the nickname the Angel of Hadley." },
    { x: 272, y: 610, title: "Dover, MA - The Dover Demon ", description: "On April 21, 1977, three teenagers in eastern Massachusetts claimed to see a creature with glowing orange eyes now known as the Dover Demon. " },
    { x: 328, y: 697, title: "Nonamesset Island, MA - Native Stories", description: "Story from 1702 by John Winthrop: The Natives of Elizabeth Island say that the devil was making a stone Bridge over from the main to Nanamesset Island, and a crab catched him by the fingers, with which he snatched up his hand and flung it towards Nantucket, and the Crabs breed there ever since. (Source: William Simmons. Spirit of the New England Tribes: Indian History and Folklore, 1620-1984. 1986) " },
    { x: 310, y: 593, title: "Sea Shanties - Work Songs ", description: "Sea Shanties were traditional work songs in New England (or whaling songs).  These songs have recently increased in popularity by people who do not even work on the ocean." },
    { x: 255, y: 635, title: "Wrentham, MA - King Philip High School ", description: "King Philip high school is a high school for students from Wrentham, Norfolk and Plainville.  It's name is a reminder of King Philip's War from 1675-1676.  All but 4 houses were burned down in Wrentham during the war." },
    { x: 199, y: 690, title: "Mohegan people in Connecticut ", description: "Uncas, the leader of the Mohegan people in Connecticut, sided with the English in King Philip's War, and as a result were able to keep some of their land around here still to this day." },
    { x: 390, y: 430, title: "Phippsburg, ME - First New England Colony", description: "Months after the first English colony in Jamestown, Virginia another English colony (known as the Popham or Sagadahoc Colony) was founded at the mouth of the Kennebec River, near present day Phippsburg. This colony only lasted months before being abandoned, but was the first England colony in New England which paved the way for the Pilgrims a decade later." },
    { x: 315, y: 638, title: "Plymouth, MA - The Pilgrims ", description: "In December 1620, the Pilgrims landed at Plymouth, Massachusetts — a foundational moment in the early history of colonial America and its path toward independence." },
    { x: 135, y: 400, title: " Northfield, VT - The Pigman ", description: "The “Pigman” is a monstrous creature best associated with Northfield, Vermont—although stories have relocated a similar being throughout New England" },
    { x: 152, y: 626, title: "Springfield, MA - The Birthplace of Basketball ", description: "James Naismith invented basketball for the YMCA in Springfield, MA in 1891. " },
    { x: 100, y: 535, title: "Bennington - VT - Bennington Battle Day ", description: "Bennington Battle Day is a state holiday only in Vermont, celebrating an American victory during the Revolution in 1777. The battle actually took place in New York, but the British were marching towards Bennington. " },
    { x: 238, y: 690, title: "Rhode Island - Victory Day ", description: "Victory Day is observed only in Rhode Island, on the second Monday in August. It is supposed to celebrate the conclusion of World War II. Most people however call it V-J Day which means victory over Japan, which has become controversial. " },
    { x: 235, y: 490, title: "New Hampshire - Civil Rights Day ", description: "All the states in New England celebrate MLK Day, but New Hampshire calls it Civil Rights Day and celebrates other activists along with MLK." },
    { x: 170, y: 675, title: "Connecticut - Presidents' Day ", description: "Presidents' Day is observed in most states for George Washington's and Lincoln's birthday. Connecticut however recognizes two separate holidays in February for Lincoln's Birthday and Washington's Birthday. " },
    { x: 300, y: 400, title: "Maine - Juneteenth", description: "Currently Maine and Massachusetts are the only 2 states in New England that recognize Juneteenth, although some towns in other states may also recognize it." },

  ], []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Position | null>(null);


  useEffect(() => {
    function updatePositions() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const containerAspect = containerWidth / containerHeight;
      const imageAspect = originalWidth / originalHeight;
      let mapWidth: number, mapHeight: number, offsetX: number, offsetY: number;

      if (containerAspect > imageAspect) {
        mapHeight = containerHeight;
        mapWidth = mapHeight * imageAspect;
        offsetX = (containerWidth - mapWidth) / 2;
        offsetY = 0;
      } else {
        mapWidth = containerWidth;
        mapHeight = mapWidth / imageAspect;
        offsetX = 0;
        offsetY = (containerHeight - mapHeight) / 2;
      }

      const newPositions = markers.map(marker => ({
        left: offsetX + (marker.x / originalWidth) * mapWidth,
        top: offsetY + (marker.y / originalHeight) * mapHeight,
        title: marker.title,
        description: marker.description,
      }));

      setPositions(newPositions);
    }

    updatePositions();

    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [markers, originalWidth, originalHeight]);

  return (
    <div className="app-wrapper" style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <div className="map-container" ref={containerRef} style={{ flex: 1, position: 'relative' }}>
      <div className="wave" />
        <h1 className="title">New England Folklore Map</h1>

        {positions.map((pos, i) => (
          <div
            key={i}
            onClick={() => setSelectedMarker(pos)}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              width: "12px",
              height: "12px",
              backgroundColor: selectedMarker === pos ? "blue" : "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            title={pos.title}
          />
        ))}
      </div>
      <div
        className={`scroll-panel ${selectedMarker ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()} // prevent clicks inside scroll closing it accidentally
      >
        {selectedMarker ? (
          <>
            <h2>{selectedMarker.title}</h2>
            <p>{selectedMarker.description}</p>
            <button className="close-btn" onClick={() => setSelectedMarker(null)}>Close</button>
          </>
        ) : (
          <div className="scroll-tab"></div>
        )}
      </div>
      {selectedMarker &&
        <div
          className="overlay"
          onClick={() => setSelectedMarker(null)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 5,
            backgroundColor: "transparent",
            cursor: "default"
          }}
        />
      }
    </div>
  );
}

export default App;

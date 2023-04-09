import { useEffect, useState } from "react";
import { Center, Collapse, Grid, GridItem, Image } from "@chakra-ui/react";
import { Game } from "./features/Game";
import { useStopwatch } from "./hooks/useStopwatch";
import { Result } from "./features/Result";

const r = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

function App() {
  const [scene, setScene] = useState<Scene>("game");
  const { time, stop, reset } = useStopwatch();

  useEffect(() => {
    if (scene === "game") reset();
    else stop();
  }, [scene]);

  return (
    <Grid
      h="100vh"
      templateAreas={`"header""main"`}
      gridTemplateRows={"50px auto"}
      justifyItems="center"
      backgroundImage={`${r(0, 3)}.jpg`}
      backgroundSize="auto"
    >
      <GridItem bg="#4CD4CB" fontSize="20px" fontWeight="bold" w="100%">
        <Center h="100%">
          <Image src="title.png" h="100%" objectFit="contain" />
        </Center>
      </GridItem>
      <GridItem p="8px" maxW="md">
        <Collapse in={scene === "game"} animateOpacity unmountOnExit>
          <Game setScene={setScene} />
        </Collapse>
        <Collapse in={scene === "result"} animateOpacity unmountOnExit>
          <Result setScene={setScene} time={time} />
        </Collapse>
      </GridItem>
    </Grid>
  );
}

export default App;

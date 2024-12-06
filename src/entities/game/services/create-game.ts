import cuid from "cuid";

import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";

export async function createGame(player: PlayerEntity) {
  const playerGames = await gameRepository.gamesList({
    players: { some: { id: player.id } },
    status: "idle",
  });

  const isGameInIdleStatus = playerGames.some(
    (game) => game.status === "idle" && game.creator.id === player.id,
  );

  if (isGameInIdleStatus) {
    return left("can-create-only-one-game" as const);
  }

  const createdGame = await gameRepository.createGame({
    creator: player,
    id: cuid(),
    status: "idle",
  });

  return right(createdGame);
}
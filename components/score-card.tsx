import { SPOTLIGHT } from "@/components/how-it-works-data";
import { ROLES } from "@/components/pipeline-board-data";
import { RecordPage } from "@/components/record-page";

/**
 * The hero illustration: one Notion record, after a run scored it.
 *
 * Everything about how a record page draws lives in RecordPage, which
 * the board also opens on click. This picks the role and nothing else,
 * so the hero shows exactly what a reader gets when they click that same
 * card three sections down.
 */
const ROLE = ROLES.find((r) => r.id === SPOTLIGHT.roleId)!;

export function ScoreCard({ now }: { now: number }) {
  return (
    <figure className="w-full">
      <RecordPage role={ROLE} now={now} />
    </figure>
  );
}

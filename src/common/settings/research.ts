import { t } from "../i18n";
import { USIEngineSetting } from "./usi";

export type SecondaryResearchSetting = {
  usi?: USIEngineSetting;
};

export type ResearchSetting = {
  usi?: USIEngineSetting;
  secondaries?: SecondaryResearchSetting[];
  enableMaxSeconds: boolean;
  maxSeconds: number;
};

export function defaultResearchSetting(): ResearchSetting {
  return {
    enableMaxSeconds: false,
    maxSeconds: 10,
  };
}

export function normalizeResearchSetting(
  setting: ResearchSetting
): ResearchSetting {
  return {
    ...defaultResearchSetting(),
    ...setting,
    secondaries: setting.secondaries?.filter((secondary) => !!secondary.usi),
  };
}

export function validateResearchSetting(
  setting: ResearchSetting
): Error | undefined {
  if (!setting.usi) {
    return new Error(t.engineNotSelected);
  }
  for (const secondary of setting.secondaries || []) {
    if (!secondary.usi) {
      return new Error(t.engineNotSelected);
    }
  }
}

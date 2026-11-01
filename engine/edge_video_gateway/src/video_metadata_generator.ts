/**
 * Multi-Platform Video Metadata & Title Optimizer
 * Production Video Repurposing Suite (Way #54 / Product 56)
 * 
 * Generates platform-tailored metadata:
 * - High-CTR YouTube Shorts titles (< 50 chars, curiosity hook)
 * - TikTok & Instagram Reels captions with hashtag clusters
 * - LinkedIn professional video copy with executive takeaways
 */

export interface ClipMetadataInput {
  clipTitle: string;
  topic: string;
  speakerName: string;
  speakerTitle: string;
  keyStat: string;
  isClinical: boolean;
}

export interface GeneratedMetadataPayload {
  youtubeShortsTitle: string;
  youtubeDescription: string;
  tiktokCaption: string;
  instagramReelsCaption: string;
  linkedInPostCopy: string;
  hashtagCluster: string[];
}

export class VideoMetadataGenerator {
  public generate(input: ClipMetadataInput): GeneratedMetadataPayload {
    const youtubeShortsTitle = `${input.keyStat} That Changed ${input.topic} #Shorts`;
    
    const hashtagCluster = [
      '#Shorts', '#HealthcareInnovation', '#ClinicalEvidence',
      '#Cardiology', '#MedEd', '#ScienceDigest', '#DoctorAdvice'
    ];

    const youtubeDescription = `In this brief clip, ${input.speakerName} (${input.speakerTitle}) breaks down the clinical trial data on ${input.topic}.

Key Takeaway: ${input.keyStat} demonstrated in landmark prospective trial.

DISCLAIMER: Educational medical informational content only. Not individual medical treatment or diagnosis advice.

${hashtagCluster.join(' ')}`;

    const tiktokCaption = `${input.keyStat} that every clinician needs to know about ${input.topic}! Breakdown with ${input.speakerName}. ${hashtagCluster.slice(0, 5).join(' ')}`;

    const instagramReelsCaption = `Did you know ${input.keyStat} was demonstrated in landmark prospective trials for ${input.topic}?

Full breakdown with ${input.speakerName} (${input.speakerTitle}).

👉 Follow for weekly evidence-based healthcare intelligence!

${hashtagCluster.join(' ')}`;

    const linkedInPostCopy = `A pivotal finding in modern ${input.topic}:

In a landmark multi-center randomized controlled trial, investigators observed a ${input.keyStat}.

In this 60-second video clip, ${input.speakerName} explains:
1. The cellular and hemodynamic mechanisms driving this outcome
2. Why non-diabetic cohorts experienced identical relative risk reductions
3. How clinical practice guidelines have shifted to Class I recommendations

Watch the full clip below. Full executive show notes and transcript linked in the comments.

#Cardiology #ClinicalTrials #HealthcareLeadership #EvidenceBasedMedicine`;

    return {
      youtubeShortsTitle,
      youtubeDescription,
      tiktokCaption,
      instagramReelsCaption,
      linkedInPostCopy,
      hashtagCluster
    };
  }
}

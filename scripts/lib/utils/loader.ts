import { track } from '../models/track'

export class loader {
    static trackList() {
        return [
            new track('ambient loop 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20ambient%20loop%201.flac?alt=media&token=b0cf718b-0585-407c-ae9a-716a41d4192a'),
            new track('ambient loop 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20ambient%20loop%202.flac?alt=media&token=1f8496a5-f851-4783-9cc0-285e7bd2fc68'),
            new track('bass 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20bass%20ch%201.flac?alt=media&token=019ccbc1-68b9-4461-b071-fd56088b9900'),
            new track('bass loop 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20bass%20verse%20loop%201.flac?alt=media&token=19a70c07-6cc6-4cab-b8a3-fd58ecb15844'),
            new track('coco loop 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20coco%20loop%201.flac?alt=media&token=24d355d6-e93a-4f58-af8a-593be3a51f64'),
            new track('coco loop 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20coco%20loop%202.flac?alt=media&token=58c8a7d3-33b8-4450-b6f8-489fc51cf420'),
            new track('coco loop 3', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20coco%20loop%203.flac?alt=media&token=31987d17-c0f6-4741-b25a-bb5fa3ac1234'),
            new track('coco puff loop', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20coco%20puff%20loop%201.flac?alt=media&token=609c6d62-e11a-4fcd-ac58-497a62078604'),
            new track('mid perc 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20DDL%20mid%20perc%202.flac?alt=media&token=77a15fb3-050c-4aa7-80c4-74e02a2cd8fa'),
            new track('mid perc 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20DDL%20mid%20perc%203.flac?alt=media&token=1f051c42-e9ff-4ae8-ae5b-6979a2f7660b'),
            new track('drum fill', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20fill%202.flac?alt=media&token=9aa5d155-9b8b-4186-9d49-1c819e8e9cc4'),
            new track('drum loop 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20loop%201.flac?alt=media&token=7546decf-4aeb-401b-b333-1aedaa64bf5a'),
            new track('drum loop 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20loop%202.flac?alt=media&token=ba81e3dc-98e2-4df2-92c1-c9275c3707e5'),
            new track('drum loop 3', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20loop%204.flac?alt=media&token=a0eeadd0-c350-42fd-94f7-ea58372443d2'),
            new track('drum loop 4', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20loop%205.flac?alt=media&token=29cb54e1-f7c0-4451-99e6-42a52b086cae'),
            new track('drum loop 5', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20loop%206.flac?alt=media&token=8e1ef821-4a8d-4b48-acb4-8fe6b698a192'),
            new track('drum loop 6', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20loop%207.flac?alt=media&token=91875855-c3d5-440e-a101-ef24fc86d83f'),
            new track('drum loop 7', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20loop%208.flac?alt=media&token=20de80e3-acc5-4bfe-9d8c-4e9721cb1e14'),
            new track('drum mid 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20MID%201.flac?alt=media&token=34fe3b17-42bf-4c3f-add8-e0c9513445a0'),
            new track('drum mid 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20MID%202.flac?alt=media&token=425671ba-e010-4873-bdb0-748694d433eb'),
            new track('drum mid 3', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20drum%20MID%203.flac?alt=media&token=382ba06e-1008-4870-b9a0-4fbcc6ba5ac2'),
            new track('end drum loop', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20end%20drum%20loop.flac?alt=media&token=cd95e8e6-4a70-46dd-9470-161a577a1368'),
            new track('synth riff', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20end%20synth%20riff.flac?alt=media&token=2c3146f3-507f-4630-8b93-4873bb2a0634'),
            new track('filtered intro', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20filtered%20intro.flac?alt=media&token=5368999f-6ff9-4e09-aa1e-ef52cfebfece'),
            new track('guitar ch riff 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20GTR%20ch%20riff%201.flac?alt=media&token=2d70a844-c335-4e51-a72d-ed6a4654b341'),
            new track('guitar ch riff 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20GTR%20CH%20riff%202.flac?alt=media&token=bd620c4d-0f69-4974-afaa-ffee5f2fb5a4'),
            new track('guitar riff 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20gtr%20riff%201.flac?alt=media&token=78d161a4-f7cd-4acd-8d31-9457dd1ad47d'),
            new track('guitar riff 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20gtr%20riff%202.flac?alt=media&token=abbd0a99-2c7d-499c-8c49-d9fe85fbbf95'),
            new track('guitar riff 3', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20GTR%20riff%203.flac?alt=media&token=76c2803c-5d28-4944-a1e5-f1313e99c451'),
            new track('hat loop 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20hat%20loop%201.flac?alt=media&token=efeb9a89-0266-4ad2-9071-907cd0560c4f'),
            new track('hat loop 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20hat%20loop%202.flac?alt=media&token=7d9ea6c1-4e23-43f0-a2ff-f6b60f4e4b7c'),
            new track('hat loop 3', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20hat%20loop%204.flac?alt=media&token=70a51870-8ba5-4def-952b-5bbd6e9b93b6'),
            new track('hat loop end 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20hat%20loop%20end%201.flac?alt=media&token=ee3f41ab-237f-47bf-b714-29989ddcdc61'),
            new track('hat loop end 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20hat%20loop%20end%202.flac?alt=media&token=87ca6e7e-3e02-4c5e-9d34-41dd03e2a4c2'),
            new track('hat loop fill', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20hat%20loop%20fill.flac?alt=media&token=0f1dd072-c360-4a46-8caf-9a391ac4e667'),
            new track('hat loop tail', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20hat%20loop%20tail.flac?alt=media&token=2397c0bf-c551-4f68-960f-538182fb6873'),
            new track('intro', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20intro.flac?alt=media&token=7d6fdcb1-a842-490a-9ecf-2aea130faa24'),
            new track('ddl perc 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20mid%20DDL%20perc%201.flac?alt=media&token=a2de34a5-92f0-4cbc-a9c8-2bd1459588ce'),
            new track('mod synth riff', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20mod%20synth%20riff.flac?alt=media&token=f6fbeecc-eaa6-4a21-8859-40bac46f8a54'),
            new track('perc loop 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20perc%20loop%201.flac?alt=media&token=3f910861-50f9-4e35-8fc6-06c1486da8de'),
            new track('synth riff 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20synth%20riff%201.flac?alt=media&token=3219a6eb-9d47-4607-ab7e-ec4932cff7c3'),
            new track('synth riff 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20synth%20riff%202.flac?alt=media&token=8902bf49-1c79-4ccf-b565-6211a6f3144b'),
            new track('synth riff 3', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20synth%20riff%203.flac?alt=media&token=88c80540-3f39-4792-9fae-4f6d5a85582e'),
            new track('synth perc 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20synth-perc%201.flac?alt=media&token=8b3b7974-f432-4c00-b80f-6a9ad0344e8b'),
            new track('tom pattern 1', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20tom%20pattern%201.flac?alt=media&token=11d92695-28b7-4f2a-b259-dc1e2bb87251'),
            new track('tom pattern 2', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20tom%20pattern%202.flac?alt=media&token=17276666-ff49-4064-ac88-f5c72b38f35f'),
            new track('virus seq', 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/THTF%20Virus%20seq.flac?alt=media&token=e328192e-04a3-47bf-a1ae-66b4e159a807')
        ]
    }
}
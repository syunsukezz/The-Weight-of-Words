## 共通設定

- 作業開始時に、共通ルールを読んで従うこと。
  - ローカル: clone 済みの `my-claude-config/CLAUDE.md` を読む。
  - クラウド: `add_repo` で `syunsukezz/my-claude-config` を追加し、その `CLAUDE.md` を読む。
  - 共通ルールの内容: 日本語での返答、Git/GitHub フロー、issue 対応フロー。
- スキルはプラグイン `my-tools@my-claude-config` を使う。
  - スキルが見えない場合は、`my-claude-config/plugins/my-tools/skills/<名前>/SKILL.md` を直接読み、その手順に従う。
- Blender の作業では `blender-design-doc` スキルを使う(設計書 → 手順ごとのスクリーンショット確認)。blenderMCP はローカル限定。

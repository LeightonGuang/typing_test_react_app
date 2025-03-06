# Change Log

## 1.2.0 (6-3-2025)

**New Features & Improvements**

- Introduced LocalStorageChecker component to manage local settings.
  - Automatically updates user settings in local storage to match the latest defaults
  - Handle adding new settings and removing deprecated settings
- Added customisable caret
  - Block ( █ )
  - Bar ( | )
  - Underline ( \_ )

## 1.1.3 (3-3-2025)

**Fixes & Enhancements**

- Fixed caret and letter colour visibility
- Added more colour themes

## 1.1.2 (26-2-2025)

**Fixes & Enhancements**

- Fixed bug where isFocused state default value is not true
- Added text overlay and blur to typing area when it is not in focus
- Added version number to the bottom of the sidebar
- Fixed bug where timer starts when restart button is pressed using Tab + Enter
- Added test completion timestamp for each test
- Added test timestamp to each history card header in history page

## 1.1.1 (24-2-2025)

**Fixes & Enhancements**

- Updated metadata description
- Fixed missing key error
- Fixed delete button deleting the wrong history
- Fixed wpm equation to penalise typing error
- Stopped input from taking modifier keys as string input
- Added toast notification for typing test completion
- Added confirmation prompt for deleting wpm history

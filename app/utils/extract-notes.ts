export type Note = {
  content: string;
  date: string | null;
  time: string | null;
  location: string | null;
};

export type BookNotes = {
  title: string;
  author: string;
  notes: Note[];
};

export default function extractAllBookNotes(content: string | null): Record<string, BookNotes> {
  if(content == null) return {};
  const entries = content.split('==========');
  const books: Record<string, BookNotes> = {};

  for (const entry of entries) {
    const lines = entry.trim().split('\n').filter((line) => line.trim());
    if (lines.length < 3) continue;

    // Extract book title and author from the first line
    const bookLine = lines[0].replace(/\uFEFF/g, '');
    const bookMatch = bookLine.match(/^(.*?)\s*\((.*?)\)/);
    if (!bookMatch) continue;

    const [, bookTitle, author] = bookMatch;
    const bookKey = `${bookTitle} (${author})`;

    // Initialize the book object if not already done
    if (!books[bookKey]) {
      books[bookKey] = {
        title: bookTitle.trim(),
        author: author.trim(),
        notes: [],
      };
    }

    // Process highlights
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].includes('Your Highlight')) {
        const note: Note = {
          content: '',
          date: null,
          time: null,
          location: null,
        };

        // Extract metadata
        const metaMatch = lines[i].match(
          /Location (\d+-\d+|\d+).*Added on (.*?)\s*(\d{1,2}:\d{2}:\d{2}\s*[AP]M)/
        );
        if (metaMatch) {
          note.location = metaMatch[1];
          note.date = metaMatch[2].trim();
          note.time = metaMatch[3].trim();
        }

        // Collect content lines and join them
        const contentLines = [];
        while (++i < lines.length && !lines[i].includes('Your Highlight')) {
          contentLines.push(lines[i].trim());
        }
        note.content = contentLines.join(' ');
        i--; // Adjust index for next iteration

        // Add the note to the book's notes
        books[bookKey].notes.push(note);
      }
    }
  }

  return books;
}
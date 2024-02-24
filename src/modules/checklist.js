export function formatData(value, format) {
	if (value === undefined || value === null || value.length === 0) return "";
		switch (format) {
			case "word-4":
				return value.match(/.{1,4}/g).join(" ");
			case "sha-256":
				return value.match(/.{1,16}/g)
					.map((r) => r.match(/.{1,4}/g).join("  "))
					.join("\n");
		}
		return value;
}

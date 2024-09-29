import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-series-question',
  templateUrl: './series-question.component.html',
  styleUrls: ['./series-question.component.css']
})
export class SeriesQuestionComponent implements OnInit, OnChanges {
  @Input() series!: { title: string }; // Usa un'interfaccia se necessario, ad esempio SeriesQuestion
  @Output() vote = new EventEmitter<{ series: string, liked: boolean }>();

  voteStatus: string = 'Non valutato';

  ngOnInit() {
    console.log(`${this.series.title} è pronto per essere valutato`);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['series']) {
      console.log(`Serie cambiata: ${changes['series'].currentValue.title}`);
    }
  }

  onVote(liked: boolean) {
    this.voteStatus = liked ? 'Piaciuta' : 'Non piaciuta';
    this.vote.emit({ series: this.series.title, liked });
  }
}
